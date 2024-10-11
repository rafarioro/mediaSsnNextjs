import React from 'react' 

export default function page( ) {
 

    return (
      <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '30px', lineHeight: '24px', fontSize: '20px' }}> 
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Privacy Policy</p>
        <p style={{ fontSize: '14px' }}>Last updated: 11/10/2024</p>

        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Account Deletion</p>
        <p>
          At Media SSN, we respect your right to control your personal data. 
        </p>

        <ul style={{ paddingLeft: '20px' }}>
          <li>Account deletion is permanent and cannot be undone</li>
          <li>All your personal information and uploaded media will be permanently removed from our servers</li>
          <li>The process may take up to 30 days to complete</li>
          <li>Any shared or verified media will remain in the system but will be disassociated from your account</li>
        </ul>
        <p>
          If you have any questions or need assistance with account deletion, please contact our support team at support@mediassn.com.
        </p>
        
      </div>
    )
  }