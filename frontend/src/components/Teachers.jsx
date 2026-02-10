import { useState, useEffect } from 'react'
import { teachersAPI } from '../api'

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [view, setView] = useState('cards')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    department: '',
  })

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    try {
      setLoading(true)
      const res = await teachersAPI.getAll()
      setTeachers(res.data)
      setMessage('')
    } catch (err) {
      setMessage('ERROR: Failed to load teachers')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await teachersAPI.update(editId, formData)
        setMessage('SUCCESS: Teacher updated')
      } else {
        await teachersAPI.create(formData)
        setMessage('SUCCESS: Teacher created')
      }
      setFormData({ firstName: '', lastName: '', email: '', subject: '', department: '' })
      setEditId(null)
      setShowForm(false)
      loadTeachers()
    } catch (err) {
      setMessage('ERROR: ' + (err.response?.data?.message || 'Failed to save'))
    }
  }

  const handleEdit = (teacher) => {
    setFormData(teacher)
    setEditId(teacher.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete teacher?')) {
      try {
        await teachersAPI.delete(id)
        setMessage('SUCCESS: Teacher deleted')
        loadTeachers()
      } catch (err) {
        setMessage('ERROR: Failed to delete')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditId(null)
    setFormData({ firstName: '', lastName: '', email: '', subject: '', department: '' })
  }

  return (
    <div>
      <div className="game-header">
        <h1>TEACHERS</h1>
        <p>Press START to manage</p>
      </div>

      {message && (
        <div className={`message ${message.includes('SUCCESS') ? 'success' : message.includes('ERROR') ? 'error' : 'loading'}`}>
          {message}
        </div>
      )}

      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'CLOSE FORM' : 'NEW TEACHER'}
        </button>
        <button className="nav-btn" onClick={loadTeachers}>
          REFRESH
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-title">{editId ? 'EDIT TEACHER' : 'NEW TEACHER'}</div>
          <div className="form-row">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-submit">SAVE</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>CANCEL</button>
          </div>
        </form>
      )}

      <div className="view-toggle">
        <button
          className={view === 'cards' ? 'active' : ''}
          onClick={() => setView('cards')}
        >
          CARDS
        </button>
        <button
          className={view === 'table' ? 'active' : ''}
          onClick={() => setView('table')}
        >
          TABLE
        </button>
      </div>

      {loading && <div className="message loading">LOADING...</div>}

      {view === 'cards' ? (
        <div className="cards-container">
          {teachers.map(teacher => (
            <div key={teacher.id} className="card">
              <h3>ID: {teacher.id}</h3>
              <div className="card-info">
                <span className="card-label">NAME:</span> {teacher.firstName} {teacher.lastName}
              </div>
              <div className="card-info">
                <span className="card-label">EMAIL:</span> {teacher.email}
              </div>
              <div className="card-info">
                <span className="card-label">SUBJECT:</span> {teacher.subject || '-'}
              </div>
              <div className="card-info">
                <span className="card-label">DEPT:</span> {teacher.department || '-'}
              </div>
              <div className="card-buttons">
                <button className="card-btn" onClick={() => handleEdit(teacher)}>EDIT</button>
                <button className="card-btn delete" onClick={() => handleDelete(teacher.id)}>DEL</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>SUBJECT</th>
                <th>DEPT</th>
                <th>ACT</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.firstName} {teacher.lastName}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.subject || '-'}</td>
                  <td>{teacher.department || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(teacher)}>EDIT</button>
                    <button onClick={() => handleDelete(teacher.id)}>DEL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

