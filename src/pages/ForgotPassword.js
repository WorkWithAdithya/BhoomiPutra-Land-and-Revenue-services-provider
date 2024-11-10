import { useState } from 'react';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState(Array(4).fill(''));
  const [stage, setStage] = useState(1); // 1: Email Input, 2: Verification, 3: New Password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (stage === 1) {
      // Email validation
      if (!email.endsWith('@gmail.com')) {
        setError('Please enter a Gmail address ending with @gmail.com');
        return;
      }

      setError('');
      setMessage('A verification code has been sent to your email.');
      setStage(2); // Move to verification stage
    } else if (stage === 2) {
      // Verification stage
      const enteredCode = verificationCode.join('');
      if (enteredCode === '1234') {
        // Simulate correct code
        setError('');
        setStage(3); // Move to new password stage
      } else {
        setError('Incorrect verification code.');
      }
    } else if (stage === 3) {
      // New password stage
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setMessage('Your password has been reset successfully.');
      setError('');
    }
  };

  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1); // Limit each input to one character
    setVerificationCode(newCode);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Forget.jpg')" }}
    >
      <form
        onSubmit={handlePasswordReset}
        className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        {stage === 1 && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        {stage === 2 && (
          <>
            <p className="text-1xl font-bold text-center">
              Enter the 4-digit code
            </p>
            <div className="flex justify-center space-x-4">
              {verificationCode.map((code, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 p-2 border border-gray-300 rounded-lg text-center"
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                />
              ))}
            </div>
          </>
        )}

        {stage === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4"
        >
          {stage === 1
            ? 'Send Reset Link'
            : stage === 2
            ? 'Verify Code'
            : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
