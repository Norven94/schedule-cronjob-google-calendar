const calendar = require('@googleapis/calendar')



async function googleTest() {
    const gauth = new calendar.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/calendar']
      });
    const authClient = await gauth.getClient();
    
    const client = await calendar.calendar({
        version: 'v3',
        auth: authClient
    });
    
    const events = await client.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }).then(res => res.data.items)
    
    events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
    })
}



module.exports = googleTest;