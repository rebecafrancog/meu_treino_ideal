document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
            
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    const users = JSON.parse(localStorage.getItem('sportfitUsers') || '[]');
            
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
        errorMessage.textContent = 'Email não encontrado. Por favor, cadastre-se primeiro.';
        errorMessage.style.display = 'block';
        return;
    }

    if (foundUser.password !== password) {
        errorMessage.textContent = 'Senha incorreta. Tente novamente.';
        errorMessage.style.display = 'block';
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    window.location.href = 'dashboard.html';
});


function generateSchedule(sports) {
    const professionals = {
        psicologo: 'Dr. Carlos Silva',
        nutricionista: 'Dra. Ana Santos',
        personal: 'Prof. João Costa',
        clinico: 'Dra. Maria Oliveira'
    };

    const baseSchedule = [
        {
            id: '1',
            day: 'Segunda-feira',
            time: '07:00',
            activity: 'Avaliação Nutricional',
            professional: professionals.nutricionista,
            type: 'consulta'
        },
        {
            id: '2',
            day: 'Segunda-feira',
            time: '09:00',
            activity: sports[0] || 'Treino Funcional',
            professional: professionals.personal,
            type: 'treino'
        },
        {
            id: '3',
            day: 'Terça-feira',
            time: '08:00',
            activity: 'Acompanhamento com Médico Esportivo',
            professional: professionals.clinico,
            type: 'consulta'
        },
        {
            id: '4',
            day: 'Quarta-feira',
            time: '07:00',
            activity: sports[1] || 'Exercícios Aeróbicos',
            professional: professionals.personal,
            type: 'treino'
        },
        {
            id: '5',
            day: 'Quinta-feira',
            time: '10:00',
            activity: 'Acompanhamento Psicológico',
            professional: professionals.psicologo,
            type: 'consulta'
        },
        {
            id: '6',
            day: 'Sexta-feira',
            time: '07:00',
            activity: sports[2] || sports[0] || 'Treino de Força',
            professional: professionals.personal,
            type: 'treino'
        },
        {
            id: '7',
            day: 'Sábado',
            time: '09:00',
            activity: 'Atividade Recreativa em Grupo',
            professional: professionals.personal,
            type: 'grupo'
        }
    ];

    return baseSchedule;
}

if (!localStorage.getItem('sportfitUsers')) {
    localStorage.setItem('sportfitUsers', JSON.stringify([]));
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    return true;
}

window.generateSchedule = generateSchedule;
window.isValidEmail = isValidEmail;
window.isValidCPF = isValidCPF;
