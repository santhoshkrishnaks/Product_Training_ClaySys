using Microsoft.Data.SqlClient;
using Server.Model;

namespace Server.Data
{
    public class OrderRepo
    {
        private readonly string _config;

        public OrderRepo(IConfiguration config)
        {
            _config = config.GetConnectionString("OrderDb");
        }

        public List<OrderEntity> GetOrders()
        {
            var orders = new List<OrderEntity>();
            string query = "SELECT * FROM Orders;";

            try
            {
                using (var conn = new SqlConnection(_config))
                using (var cmd = new SqlCommand(query, conn))
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var order = new OrderEntity
                            {
                                OrderId = (int)reader["OrderId"],
                                CustomerName = reader["CustomerName"]?.ToString() ?? string.Empty,
                                TrackingId = reader["TrackingId"]?.ToString() ?? string.Empty,
                                OrderDate = (DateTime)reader["OrderDate"],
                                Quantity = (int)reader["Quantity"],
                                Location = reader["Location"]?.ToString() ?? string.Empty,
                                Total = (decimal)reader["Total"],
                                Status = reader["Status"]?.ToString() ?? string.Empty
                            };
                            orders.Add(order);
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error while fetching orders: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetOrders: {ex.Message}");
            }

            return orders;
        }

        public bool Add(OrderEntity order)
        {
            order.OrderDate = DateTime.Now;

            string query = @"
                INSERT INTO Orders (CustomerName, TrackingId, OrderDate, Quantity, Location, Total, Status)
                VALUES (@CustomerName, @TrackingId, @OrderDate, @Quantity, @Location, @Total, @Status);
            ";

            try
            {
                using (var con = new SqlConnection(_config))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@CustomerName", order.CustomerName);
                    cmd.Parameters.AddWithValue("@TrackingId", order.TrackingId);
                    cmd.Parameters.AddWithValue("@OrderDate", order.OrderDate);
                    cmd.Parameters.AddWithValue("@Quantity", order.Quantity);
                    cmd.Parameters.AddWithValue("@Location", order.Location);
                    cmd.Parameters.AddWithValue("@Total", order.Total);
                    cmd.Parameters.AddWithValue("@Status", order.Status);

                    con.Open();
                    int rows = cmd.ExecuteNonQuery();
                    return rows > 0;
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error while adding order: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in Add: {ex.Message}");
                return false;
            }
        }

        public bool Delete(int orderId)
        {
            string query = "DELETE FROM Orders WHERE OrderId = @OrderId";

            try
            {
                using (var con = new SqlConnection(_config))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@OrderId", orderId);

                    con.Open();
                    int rows = cmd.ExecuteNonQuery();
                    return rows > 0;
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error while deleting order: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in Delete: {ex.Message}");
                return false;
            }
        }

        public bool Update(OrderEntity order)
        {
            string query = @"
                UPDATE Orders 
                SET 
                    CustomerName = @CustomerName,
                    TrackingId = @TrackingId,
                    OrderDate = @OrderDate,
                    Quantity = @Quantity,
                    Location = @Location,
                    Total = @Total,
                    Status = @Status 
                WHERE OrderId = @OrderId;
            ";

            try
            {
                using (var con = new SqlConnection(_config))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@CustomerName", order.CustomerName);
                    cmd.Parameters.AddWithValue("@TrackingId", order.TrackingId);
                    cmd.Parameters.AddWithValue("@OrderDate", order.OrderDate);
                    cmd.Parameters.AddWithValue("@Quantity", order.Quantity);
                    cmd.Parameters.AddWithValue("@Location", order.Location);
                    cmd.Parameters.AddWithValue("@Total", order.Total);
                    cmd.Parameters.AddWithValue("@Status", order.Status);
                    cmd.Parameters.AddWithValue("@OrderId", order.OrderId);

                    con.Open();
                    int rows = cmd.ExecuteNonQuery();
                    return rows > 0;
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error while updating order: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in Update: {ex.Message}");
                return false;
            }
        }
    }
}
