using Microsoft.Data.SqlClient;
using Server.Model;

namespace Server.Data
{
    public class OrderRepo
    {
        private readonly string _config;
        public OrderRepo(IConfiguration config)
        {
            this._config = config.GetConnectionString("DefaultConnection");
        }
        public List<OrderEntity> GetOrders()
        {
            var orders = new List<OrderEntity>();
            SqlConnection conn = new SqlConnection(this._config);
            string query = "select * from Orders";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var order = new OrderEntity()
                {
                    OrderId = (int)reader["OrderId"],
                    CustomerName = reader["CustomerName"].ToString() ?? string.Empty,
                    TrackingId = reader["TrackingId"].ToString() ?? string.Empty,
                    OrderDate = (DateTime)reader["OrderDate"],
                    Quantity = (int)reader["Quantity"],
                    Location = reader["Location"].ToString() ?? string.Empty,
                    Total = (decimal)reader["Total"],
                    Status = reader["Status"].ToString() ?? string.Empty
                };
                orders.Add(order);
            }
            conn.Close();
            return orders;
        }
        public void Add(OrderEntity order)
        {
            order.OrderDate = DateTime.Now;

            string query = @"
        INSERT INTO Orders (CustomerName, TrackingId, OrderDate, Quantity, Location, Total, Status)
        OUTPUT INSERTED.OrderId
        VALUES (@CustomerName, @TrackingId, @OrderDate, @Quantity, @Location, @Total, @Status);
    ";

            using (SqlConnection con = new SqlConnection(this._config))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@CustomerName", order.CustomerName);
                cmd.Parameters.AddWithValue("@TrackingId", order.TrackingId);
                cmd.Parameters.AddWithValue("@OrderDate", order.OrderDate);
                cmd.Parameters.AddWithValue("@Quantity", order.Quantity);
                cmd.Parameters.AddWithValue("@Location", order.Location);
                cmd.Parameters.AddWithValue("@Total", order.Total);
                cmd.Parameters.AddWithValue("@Status", order.Status);

                con.Open();
                order.OrderId = (int)cmd.ExecuteScalar();
            }
        }
        public bool Delete(int orderId)
        {
            string query = "DELETE FROM Orders WHERE OrderId = @OrderId";

            using (SqlConnection con = new SqlConnection(this._config))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@OrderId", orderId);

                con.Open();
                int rowsAffected = cmd.ExecuteNonQuery();

                return rowsAffected > 0; // returns true if a row was deleted
            }
        }
        public bool Update(OrderEntity order)
        {
            using (SqlConnection con = new SqlConnection(this._config))
            {
                string query = @"UPDATE Orders
                         SET CustomerName = @CustomerName,
                             TrackingId = @TrackingId,
                             OrderDate = @OrderDate,
                             Quantity = @Quantity,
                             Location = @Location,
                             Total = @Total,
                             Status = @Status
                         WHERE OrderId = @OrderId";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@CustomerName", order.CustomerName);
                cmd.Parameters.AddWithValue("@TrackingId", order.TrackingId);
                cmd.Parameters.AddWithValue("@OrderDate", order.OrderDate);
                cmd.Parameters.AddWithValue("@Quantity", order.Quantity);
                cmd.Parameters.AddWithValue("@Location", order.Location);
                cmd.Parameters.AddWithValue("@Total", order.Total);
                cmd.Parameters.AddWithValue("@Status", order.Status);
                cmd.Parameters.AddWithValue("@OrderId", order.OrderId);

                con.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected > 0;  // returns true if at least one row was updated
            }
        }


    }
}