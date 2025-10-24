using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Model;

namespace Server.Controllers
{
    [Route("api/orders")]       // Base route for this controller
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderRepo _orderRepo;

        public OrderController(OrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
        }

        [HttpGet]   // GET api/orders
        public IActionResult Get()
        {
            var orders = _orderRepo.GetOrders();
            return Ok(orders);
        }
        [HttpPost]
        public IActionResult Post([FromBody] OrderEntity neworder)
        {
            try
            {
                _orderRepo.Add(neworder);
                return CreatedAtAction(nameof(Get), new { id = neworder.OrderId }, neworder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool deleted = _orderRepo.Delete(id);

            if (deleted)
                return NoContent(); // 204 No Content if deleted successfully

            return NotFound(); // 404 if order not found
        }
        [HttpPut]
        public IActionResult Put([FromBody] OrderEntity updatedOrder)
        {
            try
            {
                bool updated = _orderRepo.Update(updatedOrder);
                if (!updated)
                {
                    return NotFound();  // No order with this id
                }
                return NoContent(); // Success, no content to return
            }
            catch (Exception e)
            {
                // Log the exception e if needed
                return StatusCode(500, "Internal server error");
            }
        }

    }
}