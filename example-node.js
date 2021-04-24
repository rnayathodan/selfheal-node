let success = '[{"tag":"html","index":0,"innerText":"Register\\n\\nPlease fill in this form to create an account.\\n\\nEmail  Password  Repeat Password \\n\\nBy creating an account you agree to our Terms & Privacy.\\n\\nRegister\\n\\nAlready have an account? Sign in.","id":"","classes":"","other":{}},{"tag":"body","index":1,"innerText":"Register\\n\\nPlease fill in this form to create an account.\\n\\nEmail  Password  Repeat Password \\n\\nBy creating an account you agree to our Terms & Privacy.\\n\\nRegister\\n\\nAlready have an account? Sign in.","id":"","classes":"","other":{}},{"tag":"form","index":0,"innerText":"Register\\n\\nPlease fill in this form to create an account.\\n\\nEmail  Password  Repeat Password \\n\\nBy creating an account you agree to our Terms & Privacy.\\n\\nRegister\\n\\nAlready have an account? Sign in.","id":"","classes":"","other":{"action":"action_page.php"}},{"tag":"div","index":0,"innerText":"Register\\n\\nPlease fill in this form to create an account.\\n\\nEmail  Password  Repeat Password \\n\\nBy creating an account you agree to our Terms & Privacy.\\n\\nRegister","id":"","classes":"container","other":{}},{"tag":"button","index":11,"innerText":"Register","id":"","classes":"registerbtn","other":{"type":"submit"}}]'
let html = `<html>

<body>
  <form action="action_page.php">
    <div class="container">
      <h1>Register</h1>
      <p>Please fill in this form to create an account.</p>
      <hr>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" id="email" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" id="psw" required>

      <div>
      <button  type=submit class="asamese">Popeye</button>
      </div>
      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
      <hr>

      <p>By creating an account you agree to our <a href="#" class="tandp">Terms &amp; Privacy</a>.</p>
    </div>

    <div class="container signin">
      <button  type=submit class="reg1">popeeyeee</button>
      <p>Already have an account? <a href="#">Sign in</a>.</p>
    </div>
  </form>
</body>

</html>
`;

const {
  Heal
} = require('./lib/Heal.js');


const HEALENIUM_URL = "http://localhost:7878/healenium";
(async () => {
  const healer = new Heal(HEALENIUM_URL);
  const locator = 'html body form div.container button.registerbtn'
  const xpath = await healer.find(locator, 'pages.HealingTestPage', 'clickSubmitButton', html);
  console.log(`Healed Locator '${locator}' to '${xpath}'`);
})();
