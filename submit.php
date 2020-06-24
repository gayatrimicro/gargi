<?php
if(isset($_REQUEST['Email']))
{
	$name = $_REQUEST['Name'];
	$company = $_REQUEST['Company'];
	$cust_email = $_REQUEST['Email'];
	$phone = $_REQUEST['Phone'];
	$comments = $_REQUEST['Comments'];
	
	$to = "gargi@gargi-india.com"; 
	$subject ="Enquiry to Gargi-India from " . $name;
	
	$message= "<table border='0' cellpadding='4' cellspacing='4' width='100%'>
              <tr>
                <td align='left' width='35%'>&nbsp;</td>
                <td align='left' width='60%'>&nbsp;</td>
              </tr>
			  <tr><td style='font-size:1.3em;' colspan='2'><strong>Contact Details</strong></td></tr>
			   <tr>
                <td align='left' width='35%'><strong>Name :</strong></td>
                <td align='left' width='60%'>
                ". $name ."</td>
              </tr>
              <tr>
                <td align='left' width='35%'><strong>Company :</strong></td>
                <td align='left' width='60%'>
                ". $company ."</td>
              </tr> 
			  <tr>
                <td align='left' width='35%'><strong>Contact :</strong></td>
                <td align='left' width='60%'>
                ". $phone ."</td>
              </tr>
			  <tr>
                <td align='left' width='35%'><strong>Email :</strong></td>
                <td align='left' width='60%'>
                ". $cust_email ."</td>
              </tr>
			  <tr>
                <td align='left' width='35%'><strong>Comments</strong></td>
                <td align='left' width='60%'>
                ". $comments ."</td>
              </tr> 
			  
            </table>";
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From:' . $cust_email . "\r\n";
	$headers .= 'Reply-To:' . $to. "\r\n";
	$headers .= "CC: work@gmicro.us";
	
	$email = mail($to, $subject, $message, $headers);
	
	if($email)
	{
		echo "E-mail Sent."  ;
	}
	else
	{
		echo "E-mail Fail To Sent.";
	}
	
}

?>