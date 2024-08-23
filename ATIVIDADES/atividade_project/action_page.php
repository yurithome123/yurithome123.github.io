<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = htmlspecialchars($_POST['firstname']);
    $email = htmlspecialchars($_POST['email']);
    $address = htmlspecialchars($_POST['address']);
    $city = htmlspecialchars($_POST['city']);
    $state = htmlspecialchars($_POST['state']);
    $zip = htmlspecialchars($_POST['zip']);
    $cardname = htmlspecialchars($_POST['cardname']);
    $cardnumber = htmlspecialchars($_POST['cardnumber']);
    $expmonth = htmlspecialchars($_POST['expmonth']);
    $expyear = htmlspecialchars($_POST['expyear']);
    $cvv = htmlspecialchars($_POST['cvv']);
    $sameadr = isset($_POST['sameadr']) ? 'Yes' : 'No';


    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "vendas";

    $conn = new mysqli($servername, $username, $password, $dbname);


    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }


    $sql = "INSERT INTO orders (firstname, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv, sameadr)
            VALUES ('$firstname', '$email', '$address', '$city', '$state', '$zip', '$cardname', '$cardnumber', '$expmonth', '$expyear', '$cvv', '$sameadr')";

    if ($conn->query($sql) === TRUE) {
        echo "<h2>Order Confirmation</h2>";
        echo "<p>Thank you for your order, $firstname.</p>";
        echo "<p>Email: $email</p>";
        echo "<p>Address: $address, $city, $state, $zip</p>";
        echo "<p>Payment Details:</p>";
        echo "<p>Card Name: $cardname</p>";
        echo "<p>Card Number: $cardnumber</p>";
        echo "<p>Expiration Date: $expmonth / $expyear</p>";
        echo "<p>CVV: $cvv</p>";
        echo "<p>Shipping address same as billing: $sameadr</p>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    echo "<p>Invalid request method.</p>";
}
?>