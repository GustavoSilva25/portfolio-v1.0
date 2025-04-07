


//background animation 

const header = document.querySelector('.header-main');
const numberOfBall = 50; 
const durationMin = 5; 
const durationMax = 10;

for (let i = 0; i < numberOfBall; i++) {
    const ball = document.createElement('div');
    ball.classList.add('ball-effect');
    const tamanho = Math.random() * 10 + 5; // Tamanho entre 5 e 15px
    ball.style.width = `${tamanho}px`;
    ball.style.height = `${tamanho}px`;
    ball.style.left = `${Math.random() * 100}vw`; // Posição horizontal aleatória
    ball.style.opacity = Math.random(); // Opacidade aleatória
    ball.style.backgroundColor = `rgb(180, 180, 180)`; 
    const horizontalDeviation = (Math.random() - 0.5) * 20; // Desvio horizontal 
    ball.style.setProperty('--horizontal-deviation', `${horizontalDeviation}vw`);
    const randomDuration = Math.random() * (durationMax - durationMin) + durationMin;
    ball.style.animationDuration = `${randomDuration}s`;
    ball.style.animationDelay = `${Math.random() * randomDuration}s`;
    header.appendChild(ball);
}

//typewriter effect

const typeWriter = (element) => {
    const textArray = element.innerHTML.split('');
    element.innerHTML = '';
    textArray.forEach((letter, i) => {
        setTimeout(() => element.innerHTML += letter, 150 * i);
    });
}

const element = document.querySelector('.text');
typeWriter(element);


//menu

document.querySelector('.btn-toggle-menu').addEventListener('click',
    () => {
        document.querySelector('.list-menu').classList.toggle("active")
    }
)

//project 

const linkProject = document.querySelector('.link-project')
const project = document.querySelector('.project')

const clientWidth = document.documentElement.clientWidth;

if (clientWidth > 600) {
    project.addEventListener('mouseover',
        () => {
            linkProject.style.display = 'flex'
        }
    )
    
    project.addEventListener('mouseout',
        () => {
            linkProject.style.display = 'none'
        }
    )
} else {
    project.addEventListener('click',
        () => {
            linkProject.style.display = 'flex'
        }
    )
    
    project.addEventListener('dbclick',
        () => {
            linkProject.style.display = 'none'
        }
    )
}


//contact form  validation

const updateMessageField = (element, message, color) => {
    element.innerHTML = message;
    element.style.color = color;
}

const isFieldValid = (element) => element.style.color === 'green';


const validateName = () => {
    const name = document.getElementById('name').value.trim()
    const helpName = document.getElementById('help-name')
    // Regular expression to allow letters, accents, and spaces 
    const namePattern =/^([áàâãéèêíïóôõöúçñ ]|[a-z]\p{M}?)+$/iu 

    if (name === '') {
        updateMessageField(helpName, 'Por favor, entre com seu nome.', 'grey')
    }
    else if(name.length <= 2 || !name.match(namePattern)) {
        updateMessageField(helpName, 'Nome inválido. Por favor, utilize pelo menos 3 caracteres.', 'red')
    }
    else {
        updateMessageField(helpName, 'Nome aceito.', 'green')
    }

    return isFieldValid(helpName);
}
  
const validateEmail = ()  => {
    const email = document.getElementById('email').value;
    const helpEmail = document.getElementById('help-email');

    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (email === '') {
        updateMessageField(helpEmail, 'Por favor, entre com seu email.', 'grey')
    }
    else if(email.match(emailPattern)) {
        updateMessageField(helpEmail, `${email} é válido.`, 'green')
    } 
    else {
        updateMessageField(helpEmail, `${email} é inválido.`, 'red')
    }

    return isFieldValid(helpEmail);
}

const validateSubject = () => {
    const subject = document.getElementById('subject').value.trim()
    const helpSubject = document.getElementById('help-subject');

    if (subject === '') {
        updateMessageField(helpSubject, 'Por favor, entre com o assunto.', 'grey')
    }
    else if ( subject.length <= 3) {
        updateMessageField(helpSubject, 'Assunto muito curto. Por favor utilize pelo menos 4 caracteres.', 'red')
    }
    else if (subject.length >= 50) {
        updateMessageField(helpSubject, 'Assunto muito longo.  Por favor utilize  até 50 caracteres.', 'red')
    }
    else {
        updateMessageField(helpSubject, 'Assunto aceito.', 'green')
    }

    return isFieldValid(helpSubject);
}


const validateMessage = () => {
    const message = document.getElementById('message').value.trim()
    const helpMessage= document.getElementById('help-message');

    if (message === '') {
        updateMessageField(helpMessage, 'Por favor, entre com uma mensagem.', 'grey')
    }
    else if (message.length <= 10) {
        updateMessageField(helpMessage, 'Mensagem é muito curta. Por favor utilize pelo menos 10 caracteres.', 'red')
    }
    else {
        updateMessageField(helpMessage, 'Mesagem aceita.', 'green')
    }

    return isFieldValid(helpMessage);
}


document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if(nameInput) {
        nameInput.addEventListener('input', validateName)
    }
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
    }
    if(subjectInput) {
        subjectInput.addEventListener('input', validateSubject);
    }
    if(messageInput) {
        messageInput.addEventListener('input', validateMessage);
    }
});

//Send the email using EmailJS
const sendEmail = (form) => {
    
    const publicKey = 'DtOz6sS0GvlszWT6l'
    emailjs.init(publicKey);
   
    // these IDs from the previous steps
    emailjs.sendForm('service_v1pgs1b', 'template_8q99pzu', form)
    .then(() => {
        console.log('SUCCESS!');
    }, (error) => {
        console.log('FAILED...', error);
    });                                                                            
}

const resetFields = () => {
    validateName();
    validateEmail();
    validateSubject();
    validateMessage();
}



document.getElementById('contact-form').addEventListener(
    'submit', (event) => {
        event.preventDefault();
        const form = event.target;

        
        // Check if all fields are valid before sending the email
        if (!validateName() || !validateEmail() || !validateSubject() || !validateMessage()) {
            alert('Por favor, preencha todos os campos corretamente antes de enviar.');
            return;
        }

        alert('Email enviado com sucesso!');
        
        sendEmail(form);
        form.reset();
        resetFields();
    }
)




//footer 
const getYear = new Date().getFullYear();

document.querySelector('.year').innerHTML = getYear;



//ScrollReveal

ScrollReveal().reveal('.about-content h2, .about-content hr',{
    duration: 2000,
    origin: 'left',
    distance: '100px',
    delay: 500,
    reset: true
});

ScrollReveal().reveal('.skills .skill-html', { 
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500,
    reset: true
});
 ScrollReveal().reveal('.skills .skill-css', { 
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500 *2,
    reset: true
});

ScrollReveal().reveal('.skills .skill-python', {
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500 *3,
    reset: true
});

ScrollReveal().reveal('.skills .skill-java', {
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500 *4,
    reset: true
});

ScrollReveal().reveal('.skills .skill-database', {
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500 *5,
    reset: true
});

ScrollReveal().reveal('.skills .skill-git', {
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500 *6,
    reset: true
});


ScrollReveal().reveal('.skills .skill-docker', {
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500 *7,
    reset: true
});


ScrollReveal().reveal('#projects .project', {
    duration: 2000,
    origin: 'bottom',
    distance: '100px',
    delay: 500,
    reset: true
});


ScrollReveal().reveal('#projects hr', {
    duration: 4500,
    origin: 'left',
    distance: '100px',
    delay: 500,
    reset: true
});
