import "./home.scss";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Candidate Management Web App</h1>
      <p>
        Thank you for choosing our Candidate Management Web App. Our application
        streamlines the process of managing candidates throughout the hiring
        process, offering a comprehensive solution for recruiters and HR
        professionals alike. Below is a brief overview of how to navigate and
        utilize the features of our application:
      </p>

      <h2>1. Home:</h2>
      <p>
        The home page provides a central hub for accessing key functionalities
        and understanding the purpose of our application. Here, you'll find a
        brief introduction to the app's features and how it can benefit your
        recruitment process.
      </p>

      <h2>2. Companies:</h2>
      <p>
        In the 'Companies' section, you can manage information related to
        various companies that your organization interacts with. Add, edit, or
        remove company details effortlessly, ensuring that you have all the
        necessary information at your fingertips when evaluating candidates for
        specific roles.
      </p>

      <h2>3. Jobs:</h2>
      <p>
        The 'Jobs' section allows you to create and manage job listings
        efficiently. Define job titles, descriptions, requirements, and other
        pertinent details to attract qualified candidates. You can easily track
        the status of each job posting and update as needed throughout the
        hiring process.
      </p>

      <h2>4. Candidates:</h2>
      <p>
        Perhaps the most critical aspect of our application, the 'Candidates'
        section empowers you to manage prospective employees seamlessly. From
        initial contact to final hiring decisions, you can track candidate
        progress, schedule interviews, and collaborate with your team members
        effectively.
      </p>

      <h2>5. Dark Mode:</h2>
      <p>
        Our application offers a sleek and modern dark mode option for users who
        prefer a more subdued interface. Simply toggle the dark mode switch in
        the navigation bar to enhance readability and reduce eye strain,
        especially during extended usage sessions.
      </p>

      <h2>How to Use:</h2>
      <ul>
        <li>
          To get started, simply navigate through the different sections using
          the navigation bar at the top of the page. Click on 'Companies',
          'Jobs', or 'Candidates' to access their respective functionalities.
          You can also switch between light and dark mode by toggling the switch
          conveniently located in the navigation bar.
        </li>
        <li>
          When adding or editing information, follow the intuitive forms and
          input fields provided. Don't forget to save your changes to ensure
          that your data is updated and accurate.
        </li>
        <li>
          For assistance or further clarification on any feature, refer to the
          provided tooltips, or reach out to our support team for prompt
          assistance.
        </li>
      </ul>

      <p>
        Thank you for choosing our Candidate Management Web App. We are
        committed to providing you with a seamless and efficient experience
        throughout your recruitment journey.
      </p>
    </div>
  );
};

export default HomePage;
