<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


//
$postJSON = file_get_contents('php://input');
$post = json_decode($postJSON, TRUE);

$PAGEACCESS = true;
require_once ('./connect.php');
//require_once('../file_upload/aws_s3/credential.php');


$output = [
    'success' => false,
    'data' => [],
    'errors' => [],
];
//
//if(empty($_GET['action'])){
//    $_GET['action'] = 'get';
//}
//if(empty($_GET['resource'])){
//    $_GET['action'] = 'students';
//}

switch($_GET['action']) {
    case 'get':
        switch ($_GET['resource']) {
            case 'students': {
                require('./actions/fetch_students.php');
                break;
            }
        }
    case 'post':
        switch ($_GET['resource']) {
            case 'add-student':
                if(!empty($post)){
                    require('./actions/add_student.php');
                }
                break;
            case 'delete-student':
                if (!empty($post)) {
                    require('./actions/delete_student.php');
                }
                break;
            case 'update-student':
                if (!empty($post)) {
                    require('./actions/update_student.php');
                }
                break;
        }
}

if (isset($students)) {
    $output['data'] = $students;
}

$json_output = json_encode($output);

print($json_output);


