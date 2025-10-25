using Microsoft.Data.SqlClient;
using Server.Model;

namespace Server.Data
{
    public class UserRepo
    {
        private readonly string _config;

        public UserRepo(IConfiguration config)
        {
            _config = config.GetConnectionString("UserDb");
        }

        public List<UserEntity> GetUsers()
        {
            var users = new List<UserEntity>();
            string query = "SELECT * FROM Users;";

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
                            var user = new UserEntity
                            {
                                UserName = reader["UserName"]?.ToString() ?? string.Empty,
                                UserEmail = reader["UserEmail"]?.ToString() ?? string.Empty,
                                UserPassword = reader["UserPassword"]?.ToString() ?? string.Empty
                            };
                            users.Add(user);
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving users: {ex.Message}");
            }

            return users;
        }

        public bool Add(UserEntity user)
        {
            string query = @"INSERT INTO Users(UserName, UserEmail, UserPassword)
                             VALUES (@username, @email, @password);";

            try
            {
                using (var conn = new SqlConnection(_config))
                using (var cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@username", user.UserName);
                    cmd.Parameters.AddWithValue("@email", user.UserEmail);
                    cmd.Parameters.AddWithValue("@password", user.UserPassword);

                    conn.Open();
                    int rows = cmd.ExecuteNonQuery();
                    return rows > 0;
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error while adding user: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error while adding user: {ex.Message}");
                return false;
            }
        }
    }
}
