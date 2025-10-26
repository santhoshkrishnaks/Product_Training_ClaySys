using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Model;

namespace Server.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderRepo _orderRepo;

        public OrderController(OrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var orders = _orderRepo.GetOrders();
                return Ok(orders);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while fetching orders");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] OrderEntity newOrder)
        {
            if (newOrder == null)
            {
                return BadRequest("Order data is required");
            }
            try
            {
                bool added = _orderRepo.Add(newOrder);
                if (added)
                {
                    return StatusCode(StatusCodes.Status201Created, new
                    {
                        message = "Order added successfully",
                        newOrder
                    });
                }
                else
                {
                    return BadRequest("Failed to add order. Please check input data");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "An internal server error occurred while adding the order");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                bool deleted = _orderRepo.Delete(id);

                if (deleted)
                {
                    return NoContent();
                }

                return NotFound($"Order with ID {id} not found");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while deleting the order");
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] OrderEntity updatedOrder)
        {
            if (updatedOrder == null)
            {
                return BadRequest("Order data is required");
            }

            try
            {
                bool updated = _orderRepo.Update(updatedOrder);

                if (!updated)
                {
                    return NotFound($"Order with ID {updatedOrder.OrderId} not found");
                }

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "An internal server error occurred while updating the order");
            }
        }
    }
}
