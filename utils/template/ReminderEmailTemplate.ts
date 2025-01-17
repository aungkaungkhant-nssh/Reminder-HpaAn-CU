import { Schedule } from "@/components/data/columns"

const ReminderEmailTemplate = (toEmail: string, item: Schedule) => {
    return {
        from: "Final Year",
        to: toEmail,
        subject: `${item.type} Scheduled for Tomorrow`,
        text: `Hello, this is a reminder that you have ${item.type} scheduled for tomorrow. Please prepare accordingly.`,
        html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                  }
                  .header {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">Final Year UCSH</div>
                  <p>Hello,</p>
                 <p>
                    This is a friendly reminder that you have <strong>${item.type} (<i>${item.subject?.code}-${item.subject?.name}</i>)</strong> with <strong>${item.teacher?.name}</strong> scheduled for tomorrow. Please make the necessary preparations.
                </p>
                  <p>Best regards,</p>
                  <p>Final Year Team</p>
                </div>
              </body>
            </html>
        `
    };
}

export default ReminderEmailTemplate;