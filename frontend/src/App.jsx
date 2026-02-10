import { useState } from 'react'
import Teachers from './components/Teachers'
import Students from './components/Students'

export default function App() {
  const [activeTab, setActiveTab] = useState('teachers')

  return (
    <div className="gameboy-screen">
      <div className="screen-content">
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeTab === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveTab('teachers')}
          >
            TEACHERS
          </button>
          <button
            className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            STUDENTS
          </button>
        </div>

        {activeTab === 'teachers' && <Teachers />}
        {activeTab === 'students' && <Students />}
      </div>
    </div>
  )
}

