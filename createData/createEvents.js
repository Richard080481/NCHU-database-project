const faker = require('faker');
const mysql = require('mysql2/promise');

const eventNames = [
    "Team Retreat",
    "Product Launch",
    "Review Meeting",
    "Customer Appreciation",
    "Innovation Summit",
    "Leadership Workshop",
    "Company Picnic",
    "Project Kickoff",
    "Financial Review",
    "Networking Breakfast",
    "Recognition Ceremony",
    "Business Expo",
    "Innovation Hackathon",
    "Client Showcase",
    "Charity Drive",
    "Roundtable Discussion",
    "Collaboration Workshop",
    "Sales Seminar",
    "Volunteer Day",
    "Planning Retreat",
];

const generateFakeEvent = () => {
    const startDateTime = new Date('2023-12-01T00:00:00'); // Start of December 2023
    const endDateTime = new Date('2024-12-31T23:59:59');   // End of December 2024
    const randomStartTime = faker.date.between(startDateTime, endDateTime);
    const randomEndTime = new Date(randomStartTime);
    randomEndTime.setHours(randomEndTime.getHours() + 2);

    return {
        name: eventNames[Math.floor(Math.random() * eventNames.length)],
        startTime: randomStartTime,
        endTime: randomEndTime,
        duplicate: faker.random.arrayElement([0, 1, 7, 30, 365]),
    };
};

const createFakeEvents = async (userId, numEvents) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'admin',
    });

    try {
        for (let i = 0; i < numEvents; i++) {
            const fakeEvent = generateFakeEvent();
            const startTimeISO = fakeEvent.startTime.toISOString();
            const endTimeISO = fakeEvent.endTime.toISOString();

            await connection.execute('INSERT INTO schedules (userID, name, startTime, endTime, duplicate) VALUES (?, ?, ?, ?, ?)', [
                userId,
                fakeEvent.name,
                startTimeISO,
                endTimeISO,
                fakeEvent.duplicate,
            ]);
        }
    } finally {
        connection.end();
    }
};

const getAllUsers = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'admin',
    });

    try {
        const [rows] = await connection.execute('SELECT userID FROM users');

        return rows;
    } finally {
        connection.end();
    }
};

getAllUsers()
    .then(users => {
        // Process each user sequentially
        const createEventsPromises = users.map(user => createFakeEvents(user.userID, 10));
        return Promise.all(createEventsPromises);
    })
    .then(() => {
        console.log('Events created successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });


