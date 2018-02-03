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
//            case 'record-item': {
//                if (!empty($_GET['recordID'])) {
//                    require('./actions/fetch_single_record_item.php');
//                } else {
//                    //pulls all record items
//                    require('./actions/fetch_record_items.php');
//                }
//                break;
//            }
//            case 'client_list': {
//                if (!empty($_GET['vetID'])) {
//                    require('./actions/read_vets_owners.php');
//                }
//                else{
//
//                }
//                break;
//            }
//            case 'pets_for_vet': {
//                if (!empty($_GET['ownerID']) && !empty($_GET['vetID'])) {
//                    require('./actions/read_client_pets_for_vet.php');
//                }
//                break;
//            }
//            case 'activate_account': {
//                if (!empty($_GET['actNum'])) {
//                    require('./actions/update_activate_account.php');
//                }
//                break;
//            }

        }
    case 'post':
        switch ($_GET['resource']) {
            case 'add-student':
                if(!empty($post)){
                    require('./actions/add_student.php');
                }
                break;
//                break;
//            case 'login':
//                if (!empty($post)) {
//                    require('./actions/login.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource login');
//                }
//                break;
//            case 'vetlogin':
//                if (!empty($post)) {
//                    require('./actions/vet_login.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource vet_login');
//                }
//                break;
//
//            case 'pet':
//                if (!empty($post)) {
//                    require('./actions/add_pet.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource pet');
//                }
//                break;
//            case 'deletePet':
//                if (!empty($post)) {
//                    require('./actions/soft_delete_pet.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource deletePet');
//                }
//                break;
//
//            case 'register':
//                if (!empty($post)) {
//                    require('./actions/add_user.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource register');
//                }
//                break;
//
//            case 'upload-item': {
////                if (empty($post)) {
//                require('../file_upload/aws_s3/page.php');
////                }else{
////                    throw new Exception('Must have a post variable when getting resource upload-item');
////                }
//                break;
//            }
//            case 'deleteRecord': {
//                if (!empty($post)) {
//                    require('./actions/soft_delete_record.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource delete-record');
//                }
//                break;
//            }
//            case 'registerVet': {
//                if (!empty($post)) {
//                    require('./actions/add_vet.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource register-vet');
//                }
//                break;
//            }
//            case 'editMedicalRecord': {
//                if (!empty($post)) {
//                    require('./actions/edit_medical_record.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource edit medical record');
//                }
//                break;
//            }
//            case 'petVetConnect': {
//                if (!empty($post)) {
//                    require('./actions/connect_pet_to_vet.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource pet vet connect');
//                }
//                break;
//            }
//            case 'disconnectPet': {
//                if (!empty($post)) {
//                    require('./actions/update_delete_pet_from_vet.php');
//                }
//                break;
//            }
//            case 'base64_upload': {
//                if (!empty($post)) {
//                    require('../file_upload/aws_s3/base64_to_file.php');
//                }
//                break;
//            }
//            case 'contact_us': {
//                if (!empty($post)) {
//                    require('../php_mailer/mail_handler.php');
//                } else {
//                    throw new Exception('Must have a post variable when getting trying to send an email');
//                }
//            }
        }

}




if (isset($students)) {
    $output['data'] = $students;
}

$json_output = json_encode($output);

print($json_output);


