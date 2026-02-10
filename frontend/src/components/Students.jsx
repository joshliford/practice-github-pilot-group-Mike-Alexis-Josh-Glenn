import { useState, useEffect } from 'react'
import { studentsAPI } from '../api'

export default function Students() {
  const [students, setStudents] = useState([])
  const [view, setView] = useState('cards')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    grade: '',
    enrollmentStatus: '',
  })

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      const res = await studentsAPI.getAll()
      setStudents(res.data)
      setMessage('')
    } catch (err) {
      setMessage('ERROR: Failed to load students')
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
        await studentsAPI.update(editId, formData)
        setMessage('SUCCESS: Student updated')
      } else {
        await studentsAPI.create(formData)
        setMessage('SUCCESS: Student created')
      }
      setFormData({ firstName: '', lastName: '', email: '', studentId: '', grade: '', enrollmentStatus: '' })
      setEditId(null)
      setShowForm(false)
      loadStudents()
    } catch (err) {
      setMessage('ERROR: ' + (err.response?.data?.message || 'Failed to save'))
    }
  }

  const handleEdit = (student) => {
    setFormData(student)
    setEditId(student.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete student?')) {
      try {
        await studentsAPI.delete(id)
        setMessage('SUCCESS: Student deleted')
        loadStudents()
      } catch (err) {
        setMessage('ERROR: Failed to delete')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditId(null)
    setFormData({ firstName: '', lastName: '', email: '', studentId: '', grade: '', enrollmentStatus: '' })
  }

  return (
    <div>
      <div className="game-header">
        <h1>STUDENTS</h1>
        <p>Press START to manage</p>
      </div>

      {message && (
        <div className={`message ${message.includes('SUCCESS') ? 'success' : message.includes('ERROR') ? 'error' : 'loading'}`}>
          {message}
        </div>
      )}

      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'CLOSE FORM' : 'NEW STUDENT'}
        </button>
        <button className="nav-btn" onClick={loadStudents}>
          REFRESH
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-title">{editId ? 'EDIT STUDENT' : 'NEW STUDENT'}</div>
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
            <label>Student ID:</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Grade:</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Status:</label>
            <input
              type="text"
              name="enrollmentStatus"
              value={formData.enrollmentStatus}
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
          {students.map(student => (
            <div key={student.id} className="card">
              <h3>ID: {student.id}</h3>
              <div className="card-info">
                <span className="card-label">NAME:</span> {student.firstName} {student.lastName}
              </div>
              <div className="card-info">
                <span className="card-label">EMAIL:</span> {student.email}
              </div>
              <div className="card-info">
                <span className="card-label">STUD ID:</span> {student.studentId || '-'}
              </div>
              <div className="card-info">
                <span className="card-label">GRADE:</span> {student.grade || '-'}
              </div>
              <div className="card-info">
                <span className="card-label">STATUS:</span> {student.enrollmentStatus || '-'}
              </div>
              <div className="card-buttons">
                <button className="card-btn" onClick={() => handleEdit(student)}>EDIT</button>
                <button className="card-btn delete" onClick={() => handleDelete(student.id)}>DEL</button>
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
                <th>STU ID</th>
                <th>GRD</th>
                <th>STATUS</th>
                <th>ACT</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.studentId || '-'}</td>
                  <td>{student.grade || '-'}</td>
                  <td>{student.enrollmentStatus || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(student)}>EDIT</button>
                    <button onClick={() => handleDelete(student.id)}>DEL</button>
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

