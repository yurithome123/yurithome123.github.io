<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Caminhos relativos para os arquivos do PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Recebe dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$mensagem = $_POST['mensagem'];
$interesse = $_POST['interesse'];
$telefone = $_POST['telefone'];
$empresa = $_POST['empresa'];

$mail = new PHPMailer(true);

try {
    // Configurações do servidor Gmail SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'yurithomemarinisilva99@gmail.com'; // Seu email Gmail
    $mail->Password = 'tknk aagi tbsv rfth'; // Senha de app do Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Configurações do email
    $mail->setFrom('yurithomemarinisilva99@gmail.com', 'YuriDeveloper'); // Remetente
    $mail->addAddress('yurithomemarinisilva99@gmail.com', 'YuriDeveloper'); // Destinatário
    $mail->addReplyTo($email, $nome); // Responder para o email do formulário

    // Conteúdo do email
    $mail->isHTML(true);
    $mail->Subject = "Novo contato - Interesse em $interesse";
    
    // Corpo do email em HTML
    $mail->Body = "
    <h2>Novo Contato do Site</h2>
    <p><strong>Nome:</strong> {$nome}</p>
    <p><strong>E-mail:</strong> {$email}</p>
    <p><strong>Telefone:</strong> {$telefone}</p>
    <p><strong>Empresa:</strong> {$empresa}</p>
    <p><strong>Interesse:</strong> {$interesse}</p>
    <p><strong>Mensagem:</strong><br>{$mensagem}</p>
    ";

    // Versão texto plano do email
    $mail->AltBody = "
    Novo Contato do Site\n
    Nome: {$nome}\n
    E-mail: {$email}\n
    Telefone: {$telefone}\n
    Empresa: {$empresa}\n
    Interesse: {$interesse}\n
    Mensagem:\n{$mensagem}
    ";

    $mail->send();
    header('Location: obrigado.html');
    exit();
} catch (Exception $e) {
    echo "Erro ao enviar mensagem. Detalhes do erro: {$mail->ErrorInfo}";
}
?>