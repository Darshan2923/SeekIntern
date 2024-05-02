// Import necessary libraries
import cron from 'node-cron';
import ExcelJS from 'exceljs';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import jobs from '../db/Jobs.js'; // Assuming this is your MongoDB model for jobs
import dotenv from 'dotenv';
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create transporter for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
  port: 465,
  host: 'smtp.gmail.com'
});

// Function to generate Excel file and send email
async function generateExcelAndSendEmail() {
  try {
    console.log('Fetching data from MongoDB...');
    const jobsData = await jobs.find().lean();
    console.log('Data fetched successfully.');

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Jobs');

    // Add data to worksheet
    worksheet.columns = [
      { header: 'Job Title', key: 'jobTitle', width: 30 },
      { header: 'Company Logo', key: 'companyLogo', width: 50 },
      { header: 'Job Location', key: 'jobLocation', width: 30 },
      { header: 'Description', key: 'description', width: 100 },
      { header: 'Date of Posting', key: 'dateOfPosting', width: 20 },
      { header: 'Deadline', key: 'deadline', width: 20 },
      { header: 'Skillsets', key: 'skillsets', width: 50 },
      { header: 'Job Type', key: 'jobType', width: 20 },
      { header: 'Duration', key: 'duration', width: 20 },
      { header: 'Salary', key: 'salary', width: 20 }
    ];

    jobsData.forEach(job => {
      worksheet.addRow({
        'Job Title': job.jobTitle,
        'Company Logo': job.companyLogo,
        'Job Location': job.jobLocation,
        'Description': job.description,
        'Date of Posting': job.dateOfPosting,
        'Deadline': job.deadline,
        'Skillsets': job.skillsets.join(', '), // Convert array to comma-separated string
        'Job Type': job.jobType,
        'Duration': job.duration,
        'Salary': job.salary
      });
    });

    console.log('Generating Excel file...');
    const excelBuffer = await workbook.xlsx.writeBuffer();
    console.log('Excel file generated successfully.');

    console.log('Sending email with Excel file attachment...');
    await transporter.sendMail({
      from: process.env.GMAIL,
      to: 'darshanpatel2923@gmail.com', // Change this to your email address
      subject: 'Jobs Report - May 2, 2024',
      text: 'Please find attached the jobs report for May 2, 2024.',
      attachments: [{
        filename: 'jobs_report.xlsx',
        content: excelBuffer,
      }],
    });
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error generating Excel file and sending email:', error);
  }
}

// Schedule the job to run today at 18:28
cron.schedule('28 18 * * *', generateExcelAndSendEmail, {
  timezone: 'Asia/Kolkata' // India's timezone (IST)
});
