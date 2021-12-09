<?php

require_once('../phpmailer/PHPMailer.php');
require_once('../phpmailer/SMTP.php');
require_once('../phpmailer/Exception.php');

$dados = json_decode(file_get_contents('php://input'), true);//vem do js

include('corpo-email.php');

//definindo as namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;



$mail = new PHPMailer(false);// o true habilita o modo debug


try{
	$mail->CharSet = "UTF-8"; //precisei disso para os caracteres especiais funcionarem
	//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'aaaaaa@gmail.com';
	$mail->Password = '';
	$mail->Port = 587;

	$mail->setFrom('poldosantiago@gmail.com',$dados['nome']); //definindo nome remetente
	$mail->addAddress('poldosantiago@gmail.com');

	//envia uma cópia do email caso o chekbox está ativo
	if($dados['checkbox']){
		$mail->addCC($dados['email'],$dados['nome']);
	}
	
	$mail->isHTML(true);
	$mail->Subject = $dados['assunto'];
	$mail->Body = $corpo_email;
	$mail->AltBody = 'chegou o email e tals';

	if($mail->send()){
		$resposta = array("status"=>true,"mensagem"=>"Email enviado com sucesso ^^"); //crio um json com a resposta
		echo json_encode($resposta);
	}
	else{
		$resposta = array("status"=>false,"mensagem"=>"Email não enviado =/");
		echo json_encode($resposta);
	}
}
catch(Exception $e){
	$resposta = array("status"=>false,"mensagem"=>"Erro ao enviar email : ");
	echo json_encode($resposta);
}
?>