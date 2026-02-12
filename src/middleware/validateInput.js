// Input validation and sanitization middleware

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Trim inputs
  if (name) req.body.name = name.trim();
  if (email) req.body.email = email.trim().toLowerCase();

  // Validate name
  if (!name || name.trim().length === 0) {
    errors.push("Name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (name.trim().length > 50) {
    errors.push("Name cannot exceed 50 characters");
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // Validate password strength
  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  } else if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  } else if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  } else if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*)");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Trim and lowercase email
  if (email) req.body.email = email.trim().toLowerCase();

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // Validate password
  if (!password) {
    errors.push("Password is required");
  } else if (password.length === 0) {
    errors.push("Password cannot be empty");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

export const validatePasswordReset = (req, res, next) => {
  const { password } = req.body;
  const errors = [];

  // Validate new password strength
  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  } else if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  } else if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  } else if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*)");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  // Trim and lowercase email
  if (email) req.body.email = email.trim().toLowerCase();

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};
