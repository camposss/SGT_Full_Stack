<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$id = $post["studentId"];


$query = "DELETE FROM `students` WHERE `id`= '$id'";

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

