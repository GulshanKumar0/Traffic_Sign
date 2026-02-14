const topics = [
  'Classical Thinkers',
  'Indian Sociology',
  'Research Methods',
  'Social Stratification',
  'Gender and Society'
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <section>
        <h3>Quick Topics</h3>
        <ul>
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Saved Chats</h3>
        <p>Resume previous exam discussions here.</p>
      </section>
      <section>
        <h3>Revision Notes</h3>
        <p>Auto-generated concise notes by chapter.</p>
      </section>
    </aside>
  );
};

export default Sidebar;
