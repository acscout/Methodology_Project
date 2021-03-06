<!DOCTYPE html>
<!--
	The purpose of this page is to act as the homepage to our website. All user functions will be stored here
		Versions:
			1.0.0	-	March 21, 2019
					Functioning webpage, added 3 dropdown menu's with some functional links
			1.0.1	-	March 22, 2019
					Added a oscillating ball and created a background image
-->
<html>

  <head>
    <title>SportzSquares - Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
<!-- This code was found on: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown to create our dropdown menus -->
<style>

.dropbtn {
  background-color: black;
  color: yellow;
  padding: 41px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-left: 50px;
}

.dropbtn:hover, .dropbtn:focus {
	       background-color: #7C6818;
      }

      .dropdown {
  position: absolute;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}

<!-- End of code from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown -->
<!-- ---------------------------------------------------------------------------->
<!-- Bouncy Ball -->
<!-- This code was taken from: https://www.html.am/html-codes/marquees/css-bouncing-image.cfm -->

.vertically 
{
 height: 400px;	
 overflow: hidden;
 position: relative;
}

.vertically .inner 
{
 position: absolute;
 width: 100%;
 height: 100%;
 
 /* Starting position */
 -moz-transform:translateY(40%);
 -webkit-transform:translateY(40%);	
 transform:translateY(40%);
 
 /* Apply animation to this element */	
 -moz-animation: vertically 5s linear infinite alternate;
 -webkit-animation: vertically 5s linear infinite alternate;
 animation: vertically 5s linear infinite alternate;
}

/* Move it (define the animation) */
@-moz-keyframes vertically 
{
 0%   { -moz-transform: translateY(70%); }
 100% { -moz-transform: translateY(0%); }
}

@-webkit-keyframes vertically 
{
 0%   { -webkit-transform: translateY(70%); }
 100% { -webkit-transform: translateY(0%); }
}

@keyframes vertically 
{
 0%   { 
 -moz-transform: translateY(70%); /* Browser bug fix */
 -webkit-transform: translateY(70%); /* Browser bug fix */
 transform: translateY(70%); 		
 }

 100% { 
 -moz-transform: translateY(0%); /* Browser bug fix */
 -webkit-transform: translateY(0%); /* Browser bug fix */
 transform: translateY(0%); 
 }

}

  /* code take from https://stackoverflow.com/questions/34556024/how-to-do-a-true-carbon-fiber-css-background */
  body {
  background-color: rgb(32, 32, 32);
  background-image: linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(to bottom, rgb(8, 8, 8), rgb(32, 32, 32));
  background-size: 10px 10px, 10px 10px, 10px 5px;
  background-position: 0px 0px, 5px 5px, 0px 0px;
  }
</style>

<!-- End of Code taken from: https://www.html.am/html-codes/marquees/css-bouncing-image.cfm -->

  </head>
  <!--  Split head and Body -->

  <body>
    <div id="Title_Of_Website">
      <p1>
        <a href="HomePage.html"><img src="images\LOGO.png" style="float: left" width="320" height="320" hspace="20"/>
      </a>

      <div class="dropdown">
        <!-- Button1 -->
        <button onclick="dropdownF()" class="dropbtn" hspace="15" >Login</button>
        <div id="myDropdown" class="dropdown-content">
          <p>
            <a href="Signup.html">Create Account</a>
            <a href="ErrorPage.html">Sign in</a>
          </p>
        </div>
        <!--  --------------------------------------------------------------------- -->
        <button onclick="dropdownF2()" class="dropbtn" hspace="15" >Rules</button>
        <div id="myDropdown2" class="dropdown-content">

          <p>
            <a href="Rulez.html">Game Rules</a>
            <a href="Contactus.html">Contact Us</a>
	    <a href="About.html">About</a>
          </p>
        </div>
        <!-- ------------------------------------------------------------ -->
        <button onclick="dropdownF3()" class="dropbtn" hspace="15">Play Now</button>
        <div id="myDropdown3" class="dropdown-content">

          <p>
            <a href="Create_Board.html">Create Quick Board</a>
            <a href="ErrorPage.html">Play Traditional Board</a>
            <a href="ErrorPage.html">Play Online</a>
            <!-- Right now, this link only brings you to the team page -->
          </p>
        </div>

      </div>
</p1>

<div class="vertically">
<div class="inner">
<img src="https://purepng.com/public/uploads/large/purepng.com-basketballbasketballgamebasketba
ll-1701528096406slo4b.png" style="float: right" width="220" height="220" class="imganim"/>

</div>
</div>


    </div>




<!-- This code was found and modified on: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown to create our dropdown menus -->
    <script>
      /* When the user clicks on the button, 
                              toggle between hiding and showing the dropdown content */
      function dropdownF() {
        document.getElementById("myDropdown").classList.toggle("show");
      }

      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    </script>
    <!--                                                        -->
    <script>
      /* When the user clicks on the button, 
                              toggle between hiding and showing the dropdown content */
      function dropdownF2() {
        document.getElementById("myDropdown2").classList.toggle("show");
      }

      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    </script>
    <!--                                                        -->
    <script>
      /* When the user clicks on the button, 
                              toggle between hiding and showing the dropdown content */
      function dropdownF3() {
        document.getElementById("myDropdown3").classList.toggle("show");
      }

      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    </script>
<!-- End of Code from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown to create our dropdown menus -->

  </body>

</html>
