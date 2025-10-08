"use strict";
class Users {
    constructor(id, name, email, role) {
        this._name = "";
        this._email = "";
        this._role = "";
        this._id = id;
        this.name = name;
        this.email = email;
        this._role = role;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get role() {
        return this._role;
    }
    set name(value) {
        if (value) {
            this._name = value;
        }
        else {
            throw new Error('Please Fill All the Field');
        }
    }
    set email(value) {
        if ((value.includes("@gmail.com") || value.includes("@outlook.com"))) {
            this._email = value;
        }
        else {
            throw new Error('Please Enter the Valid gmail or outlook mail');
        }
    }
}
class UserManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    addUser(name, email, role) {
        if ((this.findByProperty('email', email))) {
            throw new Error("Email already Exist");
        }
        const user = new Users(this.nextId++, name, email, role);
        this.users.push(user);
        return user;
    }
    findByProperty(property, value) {
        return this.users.find(user => user[property] === value);
    }
    getAllUsers() {
        return [...this.users];
    }
    updateUser(userId, name, email, newRole) {
        const user = this.findByProperty('id', userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (this.findByProperty('email', email)) {
            throw new Error('User with this email already exists');
        }
        user.name = name;
        user.email = email;
        user._role = newRole;
        return user;
    }
    deleteUser(userId) {
        const index = this.users.findIndex(user => user.id === userId);
        if (index === -1) {
            throw new Error('User not found');
        }
        this.users.splice(index, 1);
    }
}
let editingUserId = null;
const userManager = new UserManager();
function showMessage(text) {
    window.alert(text);
}
function handleAddUser() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    try {
        if (editingUserId !== null) {
            userManager.updateUser(editingUserId, name, email, role);
            editingUserId = null;
            document.querySelector('.btn-primary').textContent = 'Add User';
        }
        else {
            userManager.addUser(name, email, role);
        }
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('role').value = 'Admin';
        renderUsers();
    }
    catch (error) {
        showMessage(error.message);
    }
}
function editUser(userId) {
    const user = userManager.findByProperty('id', userId);
    if (user) {
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('role').value = user.role;
        editingUserId = userId;
        document.querySelector('.btn-primary').textContent = 'Update User';
        showMessage('Edit user and click Update User');
    }
}
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            userManager.deleteUser(userId);
            renderUsers();
        }
        catch (error) {
            showMessage(error.message);
        }
    }
}
function renderUsers() {
    const userList = document.getElementById('userList');
    const users = userManager.getAllUsers();
    if (users.length === 0) {
        userList.innerHTML = '<p>No users found. Add a user to get started.</p>';
        return;
    }
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
      <div class="user-number">${index + 1}.</div>
      <div class="user-name">${user.name}</div>
      <div class="user-email">${user.email}</div>
      <div class="user-role">${user.role}</div>
      <div class="user-actions">
        <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
        <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;
        userList.appendChild(userItem);
    });
}
renderUsers();
