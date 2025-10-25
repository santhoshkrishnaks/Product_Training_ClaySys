using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Model;

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepo _userRepo;

        public UserController(UserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _userRepo.GetUsers();
                return Ok(users);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "An error occurred while retrieving users");
            }
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] UserEntity user)
        {
            if (user == null)
            {
                return BadRequest("User data is required");
            }

            try
            {
                bool added = _userRepo.Add(user);

                if (added)
                {
                    return StatusCode(204,"User added successfully");
                }
                else
                {
                    return BadRequest("Failed to add user. Please check your input and try again");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "An internal server error occurred while adding the user");
            }
        }
    }
}
