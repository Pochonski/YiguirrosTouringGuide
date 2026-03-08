import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { tour, first_name, last_name, name, country, phone, email, message, date, adults, children, pickup, notes, 'g-recaptcha-response': recaptchaResponse } = req.body;

  // Determine if it's a tour booking or contact form
  const isTourBooking = tour && first_name && last_name;

  let errors = [];

  // Sanitize and validate inputs
  const sanitize = (data) => data ? data.toString().trim().replace(/[<>\"&]/g, '') : '';

  if (isTourBooking) {
    const tourName = sanitize(tour);
    const fName = sanitize(first_name);
    const lName = sanitize(last_name);
    const fullName = `${fName} ${lName}`;
    const emailAddr = sanitize(email);
    const tel = sanitize(phone);
    const pais = sanitize(country);
    const fecha = sanitize(date);
    const numAdults = sanitize(adults);
    const numChildren = sanitize(children);
    const pickupLoc = sanitize(pickup);
    const notas = sanitize(notes);

    if (!emailAddr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr)) {
      errors.push('Invalid email address');
    }

    // Verify reCAPTCHA
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaResponse) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.', errors: ['reCAPTCHA response not provided.'] });
      }
      const recaptchaVerify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`,
      });
      const recaptchaResult = await recaptchaVerify.json();
      if (!recaptchaResult.success) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.', errors: recaptchaResult['error-codes'] || [] });
      }
    }

    // Send emails
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_ENCRYPTION === 'tls',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const businessSubject = `New Tour Booking: ${tourName}`;
    const businessMessage = `
      <h3>Tour Booking Details</h3>
      <p><strong>Tour:</strong> ${tourName}</p>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${emailAddr}</p>
      <p><strong>Phone:</strong> ${tel}</p>
      <p><strong>Country:</strong> ${pais}</p>
      <p><strong>Tour Date:</strong> ${fecha}</p>
      <p><strong>Number of Adults:</strong> ${numAdults}</p>
      <p><strong>Number of Children:</strong> ${numChildren}</p>
      <p><strong>Pickup Location:</strong> ${pickupLoc}</p>
      <p><strong>Notes:</strong><br>${notas}</p>
    `;

    const clientSubject = 'Tour Pre-booking Confirmation';
    const clientMessage = `
      <h3>Thank you for your booking!</h3>
      <p>Hello ${fullName},</p>
      <p>We have received your request for <strong>${tourName}</strong> on <strong>${fecha}</strong>.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Number of adults: ${numAdults}</li>
        <li>Number of children: ${numChildren}</li>
        <li>Pickup location: ${pickupLoc}</li>
      </ul>
      <p><strong>Notes:</strong> ${notas}</p>
      <p>You will receive the service confirmation within 24 hours. An agent will contact you.</p>
      <p>Best regards,<br>Yiguirros Touring Guide</p>
    `;

    try {
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: businessSubject,
        html: businessMessage,
      });

      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: emailAddr,
        subject: clientSubject,
        html: clientMessage,
      });

      return res.status(200).json({ success: true, message: 'Booking sent successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error sending the booking.' });
    }
  } else {
    // Contact form
    const fullName = sanitize(name);
    const pais = sanitize(country);
    const tel = sanitize(phone);
    const emailAddr = sanitize(email);
    const msg = sanitize(message);

    if (!fullName) errors.push('Name is required.');
    if (!pais) errors.push('Country is required.');
    if (!tel || !/^[0-9]{7,15}$/.test(tel)) errors.push('Valid phone number is required.');
    if (!emailAddr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr)) errors.push('Valid email address is required.');
    if (!msg) errors.push('Message is required.');

    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' '), errors });
    }

    // Verify reCAPTCHA
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaResponse) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.', errors: ['reCAPTCHA response not provided.'] });
      }
      const recaptchaVerify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`,
      });
      const recaptchaResult = await recaptchaVerify.json();
      if (!recaptchaResult.success) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.', errors: recaptchaResult['error-codes'] || [] });
      }
    }

    // Send emails
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_ENCRYPTION === 'tls',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const subject = `New Contact Form Message from ${fullName}`;
    const emailBody = `
You have received a new message from the contact form:

Name: ${fullName}
Country: ${pais}
Phone: ${tel}
Email: ${emailAddr}

Message:
${msg}
    `;

    const clientSubject = 'Thank you for contacting us';
    const clientMessage = `
Dear ${fullName},

Thank you for reaching out to us. We have received your message and will get back to you shortly.

Here is the information we received:

Country: ${pais}
Phone: ${tel}
Message: ${msg}

Best regards,
Yigüirro's Touring Guide.
    `;

    try {
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${emailAddr}>`,
        to: process.env.EMAIL_TO,
        subject,
        text: emailBody,
      });

      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: emailAddr,
        subject: clientSubject,
        text: clientMessage,
      });

      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error sending the message.' });
    }
  }
}
