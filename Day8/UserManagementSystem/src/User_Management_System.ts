interface User{
    _id:number;
    _name:string;
    _email:string;
    _role:string;
}
class Users implements User {
    _id: number;
    _name: string="";
    _email: string="";
    _role: string="";

  constructor(id: number, name: string, email: string, role: string) {
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
  set name(value: string) {
    if (value) {
      this._name = value;
    } else {
      throw new Error('Please Fill All the Field');
    }
  }

  set email(value: string) {
    if ((value.includes("@gmail.com")||value.includes("@outlook.com"))) {
      this._email = value;
    } else {
      throw new Error('Please Enter the Valid gmail or outlook mail');
    }
  }
}
class UserManager {
  private users: Users[] = [];
  private nextId = 1;

  addUser(name: string, email: string, role: string): Users {
    if((this.findByProperty('email',email))){
        throw new Error("Email already Exist");
        
    }
    const user = new Users(this.nextId++, name, email, role);
    this.users.push(user);
    return user;
  }
  
  findByProperty(property: string, value: string | number): Users | undefined {
    return this.users.find(user => user[property as keyof Users] === value);
  }
  getAllUsers(): Users[] {
    return [...this.users];
  }
updateUser(userId: number, name: string, email: string,newRole:string): Users {
    const user = this.findByProperty('id', userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    // Check if email is being changed to an existing email
    if (this.findByProperty('email', email)) {
        throw new Error('User with this email already exists');
    }
    user.name = name;
    user.email = email;
    user._role = newRole;
    return user;
  }
  deleteUser(userId: number): void {
    const index = this.users.findIndex(user => user.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
  }
}
let editingUserId: number | null = null;
const userManager = new UserManager();

function showMessage(text: string): void {
    window.alert(text);
}

function handleAddUser() {
  const name = (document.getElementById('name') as HTMLInputElement).value.trim();
  const email = (document.getElementById('email') as HTMLInputElement).value.trim();
  const role = (document.getElementById('role') as HTMLSelectElement).value;

  try {
    if (editingUserId !== null) {
      userManager.updateUser(editingUserId, name, email,role);

      editingUserId = null;
      document.querySelector('.btn-primary')!.textContent = 'Add User';
    } else {
      userManager.addUser(name, email, role);
 
    }

    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('role') as HTMLSelectElement).value = 'Admin';
    renderUsers();
  } catch (error:any) {
    showMessage(error.message);
  }
}

function editUser(userId: number) {
  const user = userManager.findByProperty('id', userId);
  if (user) {
    (document.getElementById('name') as HTMLInputElement).value = user.name;
    (document.getElementById('email') as HTMLInputElement).value = user.email;
    (document.getElementById('role') as HTMLSelectElement).value = user.role;

    editingUserId = userId;
    document.querySelector('.btn-primary')!.textContent = 'Update User';

    showMessage('Edit user and click Update User');
  }
}
function deleteUser(userId: number) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      userManager.deleteUser(userId);
      renderUsers();
    } catch (error:any) {
      showMessage(error.message,);
    }
  }
}
function renderUsers() {
  const userList = document.getElementById('userList')!;
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
      <div class="user-number">${index+1}.</div>
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