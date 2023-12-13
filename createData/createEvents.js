const faker = require('faker');
const mysql = require('mysql2/promise');

const eventNames = [
    "就業講座",
    "社團博覽",
    "學術論壇",
    "專業實習",
    "創業比賽",
    "導師計畫",
    "學科競賽",
    "職涯工作",
    "留學講座",
    "交換計畫",
    "文化展演",
    "語言交流",
    "實習博覽",
    "專業培訓",
    "學生會議",
    "科技競賽",
    "藝術展覽",
    "校園音樂",
    "志願服務",
    "學術講座"
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
        duplicate: faker.random.arrayElement([0, 7, 30, 365]),
        tag: `color${Math.floor(Math.random() * 15) + 1}`
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

            await connection.execute('INSERT INTO schedules (userID, name, startTime, endTime, duplicate, tag) VALUES (?, ?, ?, ?, ?, ?)', [
                userId,
                fakeEvent.name,
                startTimeISO,
                endTimeISO,
                fakeEvent.duplicate,
                fakeEvent.tag
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

const createEventsForAUser = async () => {
    try {
        await createFakeEvents(1, 100);
        console.log('Events created successfully for user 1');
    } catch (error) {
        console.error('Error:', error);
    }
};

createEventsForAUser();

/*

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

*/
