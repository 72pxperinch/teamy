import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  listUsers,
  deleteUser,
  updateUser,
  createUser,
} from './userActions';
import {
  createTeam, listTeams, getTeamDetails, deleteTeam
} from './teamActions';

function UsersScreen(props) {
  const addUserFormRef = useRef(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    first_name: '',
    last_name: '',
    gender: '',
    domain: '',
    email: '',
    available: '',
    avatar: '',
  });

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [teamFormData, setTeamFormData] = useState({ name: '', description: '' });
  const [selectedTeam, setSelectedTeam] = useState(null);


  const userList = useSelector((state) => state.userList);
  const { userslist} = userList;
  const teamList = useSelector((state) => state.teamList);
  const { teams, loading: teamLoading, error: teamError } = teamList;
  const teamDetails = useSelector((state) => state.teamDetails);
  const { team: teamData } = teamDetails;


  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [filterAvailable, setFilterAvailable] = useState('');



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers(currentPage, 20, searchQuery, filterGender, filterDomain, filterAvailable));
    dispatch(listTeams());
    return () => { };
  }, [dispatch, currentPage, searchQuery, filterGender, filterDomain, filterAvailable]);

  useEffect(() => {
    if (userslist) {
      setPages(userslist.totalPages);
    }
  }, [userslist]);

  useEffect(() => {
    if (selectedTeam != null){
      dispatch(getTeamDetails(selectedTeam))
      return () => { };
    }
  }, [dispatch, selectedTeam]);




  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterGender = (e) => {
    setFilterGender(e.target.value);
  };

  const handleFilterDomain = (e) => {
    setFilterDomain(e.target.value);
  };

  const handleFilterAvailable = (e) => {
    setFilterAvailable(e.target.value);
  };




  const createTeamFromUsers = () => {
    setShowTeamForm(!showTeamForm);
  };

  const handleTeamFormChange = (e) => {
    setTeamFormData({ ...teamFormData, [e.target.name]: e.target.value });
  };

  const handleTeamFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createTeam({ ...teamFormData, users: selectedUsers }));

    setTeamFormData({ name: '', description: '' });
    setSelectedUsers([]);

    setShowTeamForm(false);
  };

  const toggleTeamDetailsOverlay = (teamId) => {
    setSelectedTeam(teamId);
    setShowTeamDetails(!showTeamDetails);
  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(_id => _id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  const handleDeleteTeam = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      dispatch(deleteTeam(id));
    }
  };


  const toggleUserDetailsOverlay = (user) => {
    setSelectedUser(user);
    setShowUserDetails(!showUserDetails);
  };

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };
  const editHandler = (userEdit) => {
    setEditMode(true);
    if (userEdit) {
      setFormData({
        userId: userEdit.id,
        first_name: userEdit.first_name,
        last_name: userEdit.last_name,
        gender: userEdit.gender,
        domain: userEdit.domain,
        email: userEdit.email,
        available: userEdit.available,
        avatar: userEdit.avatar,
      });
    }
    setShowUserDetails(!showUserDetails);
    setShowAddUserForm(true);
    if (addUserFormRef.current) {
      addUserFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateUser(formData));
      setEditMode(false);
    } else {
      dispatch(createUser(formData));
    }
    setFormData({
      userId: '',
      first_name: '',
      last_name: '',
      gender: '',
      domain: '',
      email: '',
      available: '',
      avatar: '',
    });
  };

  const toggleAddUserForm = (team) => {
    setShowAddUserForm(!showAddUserForm);
    setEditMode(false);
    setFormData({
      userId: '',
      first_name: '',
      last_name: '',
      gender: '',
      domain: '',
      email: '',
      available: '',
      avatar: '',
    });
  };




  const UserCard = ({ user }) => {
    const isSelected = selectedUsers.includes(user._id);
    return (
      <div className={`card ${isSelected ? 'selected' : ''}`} onClick={showTeamForm ? () => toggleUserSelection(user._id) : () => toggleUserDetailsOverlay(user)}>
        <div className="img-avatar">
          <img src={user.avatar} className="avatar" alt="User Avatar" />
        </div>
        <div className="card-text">
          <div className="portada" style={{
            backgroundImage: user.available
              ? 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)'
              : 'linear-gradient(-60deg, #a01616 0%, #f4843f 100%)'
          }}>
          </div>
          <div className="title-total">
            <div className="title">{user.domain}</div>
            <h4>{user.first_name} {user.last_name}</h4>
            <div className="desc">Gender: {user.gender}</div>
            <div className="desc"><b>Email: {user.email}</b></div>
          </div>
        </div>
      </div>
    );
  };



  const TeamTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Number of users</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team._id}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.userCount}</td>
              <td>
                <button onClick={() => toggleTeamDetailsOverlay(team._id)}>View</button>
                <button onClick={() => handleDeleteTeam(team._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <div className="content content-margined">



      <h2 className='mainHeading'>Browse Users</h2>


      <div className="search-filter">
        <input
          className='inputWidth'
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={filterGender} onChange={handleFilterGender}>
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Bigender">Bigender</option>
          <option value="Agender">Agender</option>
          <option value="Polygender">Polygender</option>
          <option value="Non-binary">Non-binary	</option>
          <option value="Genderfluid">Genderfluid</option>
          <option value="Genderqueer">Genderqueer</option>
        </select>
        <input
          className='inputWidth'
          type="text"
          placeholder="Filter by Domain..."
          value={filterDomain}
          onChange={handleFilterDomain}
        />
        <select value={filterAvailable} onChange={handleFilterAvailable}>
          <option value="">Filter by available</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>


      <div className="cardContainer">
        <div className="cardWrap">

          {userslist?.users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>


      <div className="wrapper">
        <h5><b>Pages</b></h5>
        <div>
          <ul className="pager">
            {Array.from({ length: pages }, (_, i) => (
              <li key={i} className={`pager__item ${currentPage === i + 1 ? 'active' : ''}`}>
                <a className="pager__link" href="#" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="add-user-form">

        {showTeamForm && (
          <h2>Create new Team</h2>
        )}

        {showTeamForm && (
          <div className="user-form">
            <form onSubmit={handleTeamFormSubmit}>
              <p className='teamAlert'>While creating team you can add users by selecting from the above list itself</p>
              <input
                type="text"
                placeholder="Team Name"
                name="name"
                value={teamFormData.name}
                onChange={handleTeamFormChange}
                className="input-field inputWidth"
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={teamFormData.description}
                onChange={handleTeamFormChange}
                className="input-field inputWidth"
              />
              <button className="submit-button" type="submit">Create Team</button>
            </form>
          </div>
        )}

        <button className="create-button" onClick={createTeamFromUsers}>{showTeamForm ? 'Close Team Form' : 'Create Team'}</button>

        <div ref={addUserFormRef} className='hr'>
          <p></p>
        </div>

        {showAddUserForm && (
          <h2>{editMode ? 'Edit User' : 'Add New User'}</h2>
        )}

        {showAddUserForm && (
          <form onSubmit={handleUserFormSubmit} className="user-form">
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="input-field inputWidth"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="input-field inputWidth"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="select-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Bigender">Bigender</option>
              <option value="Agender">Agender</option>
              <option value="Polygender">Polygender</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Genderfluid">Genderfluid</option>
              <option value="Genderqueer">Genderqueer</option>
            </select>
            <input
              type="text"
              placeholder="Domain"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              className="input-field inputWidth"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field inputWidth"
              required
            />
            <select
              name="available"
              value={formData.available}
              onChange={handleInputChange}
              className="select-field"
              required
            >
              <option value="">Select availability</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            <input
              type="text"
              placeholder="Avatar URL"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="input-field inputWidth"
              required
            />
            <button type="submit" className="submit-button">{editMode ? 'Update User' : 'Add User'}</button>
          </form>

        )}<button className="create-button" onClick={toggleAddUserForm}>{showAddUserForm ? 'Close' : 'Add New User'}</button>
      </div>


      <h2>All Teams</h2>
      {teamLoading ? (
        <div>Loading...</div>
      ) : teamError ? (
        <div>Error: {teamError}</div>
      ) : (
        <React.Fragment>
          <TeamTable />
          {showTeamDetails && selectedTeam && (
            teamData ? (
              <div className="overlay">
                <div className="overlay-content">
                  <h2>Team Details</h2>
                  <p>Name: {teamData.name}</p>
                  <p>Description: {teamData.description}</p>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Domain</th>
                        <th>Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamData.users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.first_name} {user.last_name}</td>
                          <td>{user.gender}</td>
                          <td>{user.domain}</td>
                          <td>{user.available ? 'Yes' : 'No'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => setShowTeamDetails(false)}>Close</button>
                </div>
              </div>


            ) : (
              <div>Loading...</div>
            )
          )}
        </React.Fragment>
      )}

      {showUserDetails && (<div className="overlay">
        <div className="card overlayCard">
          <div className="img-avatar">
            <img src={selectedUser.avatar} className="avatar" alt="User Avatar" />
          </div>
          <div className="card-text">
            <div
              className="portada"
              style={{
                backgroundImage: selectedUser.available
                  ? 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)'
                  : 'linear-gradient(-60deg, #a01616 0%, #f4843f 100%)',
              }}
            ></div>
            <div className="title-total">
              <div className="title">{selectedUser.domain}</div>
              <h4>
                {selectedUser.first_name} {selectedUser.last_name}
              </h4>
              <div className="desc">Gender: {selectedUser.gender}</div>
              <div className="desc">
                <b>Email: {selectedUser.email}</b>
              </div>
            </div>
          </div>
          <div className="card-buttons">
            <button className="overlayBtn" style={{ backgroundColor: '#e5be33' }} onClick={() => toggleUserDetailsOverlay(selectedUser)}>
              Close
            </button>
            <button className="overlayBtn" style={{ backgroundColor: 'green' }} onClick={() => editHandler(selectedUser)}>
              Edit
            </button>
            <button className="overlayBtn" style={{ backgroundColor: '#d32f2f' }} onClick={() => deleteHandler(selectedUser.id)}>
              Delete
            </button>

          </div>
        </div>

      </div>)}


    </div>
  );
}

export default UsersScreen;
