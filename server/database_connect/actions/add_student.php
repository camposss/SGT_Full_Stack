<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}


$output['test'][] = 'yo ho';
//$ID = $post['petID'];
$name = $post['name'];
$course = $post['course'];
$grade = $post['grade'];


//$query= "INSERT INTO students (name, course, grade) VALUES ('christian', 'chinese', '100')";

$query = "INSERT INTO `students` SET `name` = ' $post[name] ', `course` = ' $post[course] ', `grade` = ' $post[grade] '";

//$sql = "INSERT INTO MyGuests (firstname, lastname, email)
//VALUES ('John', 'Doe', 'john@example.com')";

$result = mysqli_query($conn, $query);
$output['errors'][] = $query;


if ($result) {
    $output['success'] = true;

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $students[] = $row;
        }
    } else {
        $output['errors'][] = 'no data available';
    }
}
else {
    $output['errors'][] = 'error in SQL query 22';
}

