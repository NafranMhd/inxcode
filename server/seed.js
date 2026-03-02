// Database Seed Script — populates MongoDB with existing frontend data
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Project = require('./models/Project');
const TeamMember = require('./models/TeamMember');
const Service = require('./models/Service');

const projects = [
    {
        title: 'E-Commerce Platform',
        category: 'Web Development',
        description: 'Scalable e-commerce solution with advanced inventory management and payment integration.',
        technologies: ['React', 'Node.js', 'Stripe'],
        image: '/project_ecommerce_1766409949007.png',
        order: 1,
    },
    {
        title: 'Learning Management System',
        category: 'Education Tech',
        description: 'Comprehensive LMS platform featuring video streaming, interactive assessments, and progress tracking.',
        technologies: ['Next.js', 'PostgreSQL', 'AWS'],
        image: '/project_lms_1766409972210.png',
        order: 2,
    },
    {
        title: 'Mobile Banking App',
        category: 'Mobile Development',
        description: 'Secure banking application with biometric authentication and real-time transaction processing.',
        technologies: ['React Native', 'Firebase', 'Node.js'],
        image: '/project_mobile_banking_1766409992920.png',
        order: 3,
    },
    {
        title: 'Healthcare Management',
        category: 'Enterprise Software',
        description: 'Hospital management system streamlining patient records, scheduling, and billing workflows.',
        technologies: ['Angular', 'Java Spring', 'MySQL'],
        image: '/project_healthcare_1766410011063.png',
        order: 4,
    },
    {
        title: 'AI Chatbot Platform',
        category: 'AI & ML',
        description: 'Intelligent conversational AI platform with natural language processing capabilities.',
        technologies: ['Python', 'TensorFlow', 'FastAPI'],
        image: '/project_ai_chatbot_1766410031298.png',
        order: 5,
    },
    {
        title: 'Project Management Tool',
        category: 'SaaS',
        description: 'Collaborative workspace platform with Kanban boards and real-time team synchronization.',
        technologies: ['Vue.js', 'Laravel', 'Redis'],
        image: '/project_management_tool_1766410047195.png',
        order: 6,
    },
];

const teamMembers = [
    { name: 'Mohammed Rizwan', role: 'CEO & Founder', department: 'Leadership', image: '/team_ceo_1766410066623.png', bio: 'Visionary leader driving innovation and growth.', social: { linkedin: '#', twitter: '#' }, order: 1 },
    { name: 'Ahmed Zaid', role: 'Chief Operating Officer', department: 'Leadership', image: '/team_head_academy_1766410104272.png', bio: 'Ensuring operational excellence and strategy execution.', social: { linkedin: '#', twitter: '#' }, order: 2 },
    { name: 'Ibrahim Khalil', role: 'Administrative Secretary', department: 'Administration', image: '/team_ui_designer_1766410159018.png', bio: 'Managing corporate communications and schedules.', social: { linkedin: '#' }, order: 3 },
    { name: 'Luqman Hakim', role: 'Head of HR', department: 'Human Resources', image: '/team_head_academy_1766410104272.png', bio: 'Building a culture of excellence and well-being.', social: { linkedin: '#' }, order: 4 },
    { name: 'Zainab Ahmed', role: 'Lead Developer', department: 'Technology', image: '/team_lead_developer_1766410125941.png', bio: 'Architecting scalable solutions and leading dev teams.', social: { linkedin: '#', github: '#' }, order: 5 },
    { name: 'Mariam Yusuf', role: 'Lead Graphic Designer', department: 'Design', image: '/team_cto_1766410088412.png', bio: 'Crafting visual identities and user experiences.', social: { linkedin: '#', dribbble: '#' }, order: 6 },
    { name: 'Abdullah Omar', role: 'Senior Developer', department: 'Technology', image: '/team_ui_designer_1766410159018.png', bio: 'Full-stack expert specializing in complex systems.', social: { linkedin: '#', github: '#' }, order: 7 },
];

const services = [
    { title: 'Custom Software Development', description: 'Tailored software solutions designed to meet your unique business requirements and drive digital transformation.', features: ['Requirements Analysis', 'Agile Development', 'Quality Assurance', 'Ongoing Support'], color: '#0ea5e9', category: 'software', icon: 'monitor', order: 1 },
    { title: 'Mobile App Development', description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.', features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Publishing'], color: '#8b5cf6', category: 'software', icon: 'smartphone', order: 2 },
    { title: 'Web Development', description: 'Modern, responsive websites and web applications built with cutting-edge technologies and best practices.', features: ['React & Next.js', 'Responsive Design', 'SEO Optimization', 'Performance'], color: '#10b981', category: 'software', icon: 'globe', order: 3 },
    { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and migration services to modernize your business operations.', features: ['AWS & Azure', 'Cloud Migration', 'DevOps', 'Auto Scaling'], color: '#f59e0b', category: 'software', icon: 'cloud', order: 4 },
    { title: 'Cybersecurity', description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.', features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Monitoring'], color: '#ef4444', category: 'software', icon: 'shield', order: 5 },
    { title: 'AI & Machine Learning', description: 'Intelligent solutions leveraging artificial intelligence to automate and optimize business processes.', features: ['ML Models', 'NLP', 'Computer Vision', 'Predictive Analytics'], color: '#6366f1', category: 'software', icon: 'brain', order: 6 },
    { title: 'Professional Training Programs', description: 'Industry-focused courses in software development, DevOps, cloud computing, and emerging technologies.', features: ['Live Sessions', 'Hands-on Projects', 'Industry Experts', 'Certificate'], color: '#0ea5e9', category: 'education', icon: 'graduation', order: 1 },
    { title: 'Coding Bootcamps', description: 'Intensive, project-based bootcamps designed to transform beginners into job-ready developers.', features: ['Full-Stack', 'Portfolio Projects', 'Job Placement', 'Mentor Support'], color: '#8b5cf6', category: 'education', icon: 'code', order: 2 },
    { title: 'Online Learning Platform', description: 'Self-paced online courses with interactive labs, quizzes, and community support for continuous learning.', features: ['Video Lessons', 'Interactive Labs', 'Progress Tracking', 'Community'], color: '#10b981', category: 'education', icon: 'book', order: 3 },
    { title: 'Corporate Training', description: 'Customized training programs for organizations looking to upskill their workforce in technology.', features: ['Custom Curriculum', 'On-site Training', 'Team Building', 'Assessments'], color: '#f59e0b', category: 'education', icon: 'building', order: 4 },
    { title: 'Mentorship Programs', description: 'One-on-one mentorship with industry professionals to guide career growth and skill development.', features: ['1-on-1 Sessions', 'Career Guidance', 'Code Reviews', 'Goal Setting'], color: '#ef4444', category: 'education', icon: 'target', order: 5 },
    { title: 'Certification Courses', description: 'Accredited certification programs in top technologies to validate and advance your expertise.', features: ['Industry Certs', 'Exam Prep', 'Study Materials', 'Practice Tests'], color: '#6366f1', category: 'education', icon: 'award', order: 6 },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Project.deleteMany();
        await TeamMember.deleteMany();
        await Service.deleteMany();
        console.log('🗑️  Cleared existing data');

        // Insert seed data
        await Project.insertMany(projects);
        console.log(`📦 Seeded ${projects.length} projects`);

        await TeamMember.insertMany(teamMembers);
        console.log(`👥 Seeded ${teamMembers.length} team members`);

        await Service.insertMany(services);
        console.log(`⚡ Seeded ${services.length} services`);

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

seedDB();
