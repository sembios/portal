import React from 'react'
import emailjs from 'emailjs-com';
import './About.css'

export default function About() {
    function sendEmail(e) {
        emailjs.sendForm('service_bb9ysz8', 'template_yiapf18', e.target, 'user_VF0TrW4fglfuOn8dcDcns')
        .then((result) => {
            alert('email sent successfully');
        }, (error) => {
            alert('error sending email');
        });
//clears the form after sending the email
        // e.target.reset();
    }
    
      return (
        <form className="contact-form" onSubmit={sendEmail}>
          <label>Ваше имя</label>
          <input type="text" name="from_name" />
          <label>Телефон</label>
          <input type="text" name="from_phone" />
          <label>Ваше сообщение</label>
          <textarea className="mes-form" name="message" />
          <input type="submit" value="Отправить" />
        </form>
      );
}
