CREATE DATABASE OrdersDb;
USE OrdersDb;

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1000,1),
    CustomerName VARCHAR(100),
    TrackingID VARCHAR(20),
    OrderDate DATETIME,
    Quantity INT,
    Location VARCHAR(100),
    Total DECIMAL(10, 2),
    Status VARCHAR(50)
);
INSERT INTO Orders (CustomerName, TrackingID, OrderDate, Quantity, Location, Total, Status) VALUES
('Arlene McCoy', '#TS121321', '2025-10-24 16:20:00', 20, 'Sylhed, Bondor', 500.00, 'Completed'),
('Floyd Miles', '#TS121322', '2025-10-24 16:20:00', 24, 'Sylhed, Bondor', 200.00, 'In Process'),
('Ralph Edwards', '#TS121323', '2025-10-24 16:20:00', 12, 'Sylhed, Bondor', 400.00, 'Pending'),
('Brooklyn Simmons', '#TS121324', '2025-10-24 16:20:00', 20, 'Sylhed, Bondor', 600.00, 'Completed'),
('Dianne Russell', '#TS121325', '2025-10-24 16:20:00', 20, 'Sylhed, Bondor', 100.00, 'In Process'),
('Devon Lane', '#TS121326', '2025-10-24 16:20:00', 15, 'Sylhed, Bondor', 300.00, 'Completed'),
('Courtney Henry', '#TS121327', '2025-10-24 16:20:00', 15, 'Sylhed, Bondor', 900.00, 'Pending'),
('Esther Howard', '#TS121328', '2025-10-24 16:20:00', 15, 'Sylhed, Bondor', 1000.00, 'In Process'),
('Jenny Wilson', '#TS121329', '2025-10-24 16:20:00', 15, 'Sylhed, Bondor', 230.00, 'Completed');

SELECT * FROM Orders
