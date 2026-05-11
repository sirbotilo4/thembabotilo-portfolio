Contact Form - Themba Botilo Portfolio

The contact form in index.html submits to Formspree.
Formspree endpoint: https://formspree.io/f/mgvwkkbo

How it works:
  - User fills in Name, Email, Subject, and Message
  - On submit, the form sends data to Formspree via fetch (AJAX)
  - A loading spinner shows while the request is processing
  - A success or error message displays after the response
  - No PHP or server-side code is required

To change the form endpoint:
  - Log in at https://formspree.io
  - Update the action attribute in the <form> tag in index.html