import React, { useState } from 'react';
import { FileText, Server, Shield, Lock, ChevronDown, ChevronUp } from 'lucide-react';

const InfrastructureDocs = () => {
  const [selectedDoc, setSelectedDoc] = useState('standard');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const documents = {
    standard: {
      title: "Standard On-Premises Deployment",
      icon: <Server className="w-6 h-6" />,
      color: "blue",
      sections: [
        {
          id: "overview",
          title: "Deployment Overview",
          content: `**System Architecture**

The Pico MES system consists of three primary components that work together to provide a complete manufacturing execution solution:

**1. Pico Server (Intel NUC-based)**
- One server per factory facility
- Runs Ubuntu Server operating system
- Hosts proprietary Pico MES web application
- Provides latency-free operation independent of internet connectivity
- Stores all customer data locally on-premise

**2. Pico Hubs (Edge Devices)**
- Microcontroller-based edge devices
- Distributed throughout factory floor
- Connect operators, tools, and machines to the MES
- Communicate with Pico Server over local network
- Support both Ethernet and Wi-Fi connectivity

**3. Cloud Services**
- Account management via account.picomes.io
- Remote VPN access at vpn2.picomes.com (ports 443/1194)
- Nightly backup storage in GCP
- System updates and configuration management
- Optional database replication for analytics`,
          diagram: true
        },
        {
          id: "networking",
          title: "Network Architecture & Communication",
          content: `**Local Network Requirements**

The Pico Server must be connected to the customer's local network with the ability to communicate with all Pico Hubs.

**Hub-to-Server Communication:**
- HTTPS for secure web application access
- WebSocket connections for real-time data streaming
- Local network discovery protocols for Hub registration

**Tool/Machine Connectivity:**
- Direct network connection for network-enabled tools
- USB, RS232, and other protocols via Pico Hubs for legacy equipment
- HDMI touchscreen support through Pico Hubs

**Supported Tool Protocols:**
- Open Protocol (PFOP) for torque tools
- Serial/RS232, HTTP, Modbus, Bluetooth Serial, USB HID
- OPC UA, ZPL/PNG/PDF (printers)
- Digital/Analog IO, USB Webcam
- USB PCSC (badge readers), TCP/IP

**Initial Hub Registration:**
- Hubs must be registered via Ethernet on first connection
- Requires outbound internet connectivity during initial setup
- After registration, internet connectivity no longer required for operation`
        },
        {
          id: "vpn",
          title: "Pico VPN Remote Access",
          content: `**VPN Overview**

The Pico Server is configured to reach out and connect as a client to the Pico VPN running in the cloud. This VPN connection enables authorized Pico personnel to provide remote support, troubleshooting, and system updates.

**VPN Purpose and Functionality:**

The VPN connection allows authorized Pico employees to:
- Remotely access the on-premise Pico Server and Hubs
- Push software updates and security patches
- Perform troubleshooting and diagnostics
- Complete customer requests for bug fixes
- Develop and test integrations with customer systems (datamarts, ERP, etc.)
- Provide technical support without on-site visits

**Technical Specifications:**

VPN Protocol and Security:
- Shorewalling implementation
- TLS 1.3 with TLS Ciphersuite SHA-256
- ECDSA encryption using curve secp384r1
- Shared TLS-Auth key for additional security layer
- Key-based access controls (no password authentication)
- Evaluated by expert 3rd party cybersecurity firms

**Connection Details:**
- Primary VPN endpoint: vpn2.picomes.com
- Default port: 443 (HTTPS)
- Alternate port: 1194 (if port 443 unavailable)
- Connection initiated by Pico Server (outbound only)
- Pico Server operates as VPN client, not server

**Access Control:**

Employee Access Management:
- Strictly managed through series of key-based controls
- Only authorized Pico support personnel granted access
- Individual authentication keys per employee
- Access logging and audit trails maintained
- Keys can be revoked immediately if needed

**ITAR and Security-Sensitive Deployments:**
- US Citizen-only employee access for ITAR customers
- Limited number of cleared personnel for strict environments
- Access restrictions documented and auditable
- Customer can request specific personnel restrictions

**Remote Access Capabilities:**

Through VPN, authorized personnel can:
- Login to Pico Server via command-line interface (SSH)
- Access Pico Hub management interfaces
- View system logs and diagnostics
- Perform database maintenance operations
- Deploy software updates
- Test and validate integrations
- Monitor system performance

**Disabling VPN Access:**

Customers can disable VPN connectivity by:
- Blocking outbound connections to vpn2.picomes.com at firewall
- Blocking ports 443 and 1194 to VPN endpoint
- Network-level blocking (preferred for air-gap environments)
- VPN can be re-enabled by removing firewall blocks

**Impact of Disabling VPN:**
- No remote support capability
- Software updates require on-site visits or manual installation
- Troubleshooting requires on-site support
- Longer resolution times for issues
- Higher support costs due to travel requirements
- Suitable for air-gapped and high-security environments

**VPN Connection Monitoring:**

Customers can monitor VPN usage through:
- Firewall logs showing connections to vpn2.picomes.com
- Pico Server logs recording VPN connection events
- SSH access logs showing remote login sessions
- Audit trails of actions performed during VPN sessions

**Security Best Practices:**
- Regular review of VPN access logs
- Coordination with Pico for scheduled maintenance windows
- Notification requirements for VPN access (customer policy dependent)
- VPN connection limited to maintenance and support activities only
- No persistent VPN connection (connects only when needed)`
        },
        {
          id: "security",
          title: "Security & Compliance",
          content: `**SOC 2 Type 2 Certification**

Pico MES completed SOC 2 Type 2 compliance certification as of Q3 2022, demonstrating:
- Robust security controls and procedures
- Continuous monitoring and auditing
- Data protection and privacy safeguards
- Secure development practices
- Incident response capabilities

**ITAR Compliance & Registration**

For customers with ITAR requirements, Pico provides:
- ITAR-registered support personnel
- US Citizen-only remote access for sensitive deployments
- Secure VPN access with audited controls
- On-premise data storage options
- Configurable cloud connectivity restrictions

**Security Features:**

Network Security:
- HTTPS for all web application access
- Encrypted VPN connections for remote support
- TLS 1.3 with modern cipher suites
- Network segmentation support

Access Controls:
- Role-based access control (RBAC)
- SSO integration with enterprise identity providers
- Multi-factor authentication support
- Audit logging of all user actions

Data Security:
- Encryption at rest and in transit
- Local data storage by default
- SOC 2 compliant backup partners
- Customer-controlled data replication`
        }
      ]
    },
    vm: {
      title: "Customer-Hosted Virtual Machine Deployment",
      icon: <Server className="w-6 h-6" />,
      color: "green",
      sections: [
        {
          id: "overview",
          title: "VM Deployment Overview",
          content: `**Deployment Model**

For customers who prefer to host Pico MES on their own infrastructure, the system can be deployed on customer-owned virtual machines or server racks.

**Key Characteristics:**
- Pico MES runs on customer-provided VM or physical server
- Ubuntu Server operating system required
- Customer manages hardware/VM infrastructure
- Pico manages software and application updates
- Maintains connection to Pico cloud services (configurable)
- All standard Pico MES features available
- Suitable for Level 1 "Convenience Air-Gap" security posture

**Compliance:**
- SOC 2 Type 2 certified application
- ITAR-compliant deployment options available
- Customer infrastructure subject to own audits`
        },
        {
          id: "requirements",
          title: "VM Specifications & Requirements",
          content: `**Virtual Machine Specifications**

Minimum Requirements:
- 4 vCPUs
- 8GB RAM
- 256GB storage (SSD recommended)
- Ubuntu Server 20.04 LTS or newer
- Virtualization platform: VMware ESXi, Hyper-V, KVM, or equivalent

Recommended Configuration:
- 8 vCPUs
- 16GB RAM
- 512GB storage (SSD)
- Dedicated network interface
- VM snapshot capability for backups

**Network Requirements:**

Required Internal Connectivity:
- Static IP address on customer network
- Access to all Pico Hubs (bidirectional)
- DNS resolution for internal resources
- NTP server access (customer or internet)

Required External Connectivity:
- Outbound HTTPS (443) to account.picomes.io
- Outbound VPN (443 or 1194) to vpn2.picomes.com
- Outbound HTTPS to GCP for backups (optional)
- Inbound HTTPS from user workstations`
        }
      ]
    },
    moderate: {
      title: "Moderate Restrictions Deployment",
      icon: <Shield className="w-6 h-6" />,
      color: "yellow",
      sections: [
        {
          id: "overview",
          title: "Level 2 Overview",
          content: `**Moderate Restrictions Configuration**

Level 2 "Moderate Restrictions" deployment provides enhanced security while maintaining manageable operational procedures.

**Key Characteristics:**
- VPN access can be completely disabled
- Manual software updates only
- Internet egress allowed for specific functions
- Mixed authentication models (cloud + local)
- Self-managed backups and data replication
- On-site troubleshooting required

**Security Posture:**
- No persistent remote access by Pico personnel
- Customer controls when/if VPN is enabled
- Reduced cloud dependencies
- Enhanced audit and control capabilities
- Suitable for ITAR Level 2 requirements

**Compliance:**
- SOC 2 Type 2 certified
- ITAR-compliant with restricted personnel access
- Enhanced audit logging and controls`
        },
        {
          id: "whitelist",
          title: "Network Whitelist Configuration",
          content: `**Required Domains and Addresses**

For Level 2 deployments with limited internet access, the following domains and addresses must be whitelisted to enable specific Pico MES functions.

**Authentication Services (Optional - if using cloud authentication):**

Microsoft SSO:
- login.microsoftonline.com (HTTPS/443)
- login.microsoft.com (HTTPS/443)
- graph.microsoft.com (HTTPS/443)

Google SSO:
- accounts.google.com (HTTPS/443)
- oauth2.googleapis.com (HTTPS/443)

Pico Account Services:
- account.picomes.io (HTTPS/443)

**VPN Access (Optional - if enabled temporarily):**
- vpn2.picomes.com (Port 443 primary, Port 1194 alternate)

**Operating System Updates:**
- archive.ubuntu.com (HTTPS/443)
- security.ubuntu.com (HTTPS/443)
- *.ubuntu.com (HTTPS/443) - for full Ubuntu repository access

**Time Synchronization (Critical):**
- pool.ntp.org (NTP/123) - or customer-provided NTP server
- 0.pool.ntp.org (NTP/123)
- 1.pool.ntp.org (NTP/123)
- 2.pool.ntp.org (NTP/123)
- 3.pool.ntp.org (NTP/123)

**Certificate Validation:**
- ocsp.digicert.com (HTTP/80, HTTPS/443)
- crl.microsoft.com (HTTP/80)
- *.globalsign.com (HTTP/80, HTTPS/443)

**Backup Services (Optional - if using Pico cloud backup):**
- storage.googleapis.com (HTTPS/443)
- *.googleapis.com (HTTPS/443)

**Customer Cloud Backup (Optional - if configured):**

AWS S3:
- s3.amazonaws.com (HTTPS/443)
- *.s3.amazonaws.com (HTTPS/443)
- s3.{region}.amazonaws.com (HTTPS/443)

Google Cloud Storage:
- storage.googleapis.com (HTTPS/443)
- *.storage.googleapis.com (HTTPS/443)

Azure Blob Storage:
- *.blob.core.windows.net (HTTPS/443)

**Minimum Configuration (Most Restricted):**

For customers wanting absolute minimum internet access:
- Local NTP server (customer-provided) - Port 123
- No authentication cloud services (use LDAP/AD or local auth)
- No VPN access (on-site support only)
- Local backup destination only
- Manual OS updates via secure media

**IP Address Ranges (Alternative to DNS):**

If DNS resolution is restricted, contact Pico support for current IP address ranges for:
- account.picomes.io
- vpn2.picomes.com
- Note: IP addresses may change; DNS-based whitelisting preferred

**Firewall Configuration Example:**

Outbound Rules (Allow):
- Destination: account.picomes.io, Port: 443, Protocol: HTTPS
- Destination: pool.ntp.org, Port: 123, Protocol: NTP
- Destination: security.ubuntu.com, Port: 443, Protocol: HTTPS
- Destination: vpn2.picomes.com, Port: 443, Protocol: HTTPS (optional)
- Default: DENY ALL

**Monitoring Whitelisted Connections:**
- Enable firewall logging for all allowed connections
- Regular review of connection logs
- Alert on unusual connection patterns
- Quarterly review of whitelist necessity

**Security Recommendations:**
- Use DNS-based filtering when possible
- Implement egress filtering at firewall
- Log all outbound connections
- Review whitelist quarterly
- Remove unnecessary entries
- Use customer-controlled services where possible (NTP, backup storage)`
        },
        {
          id: "authentication",
          title: "Authentication & User Management",
          content: `**Mixed Authentication Model**

Level 2 deployments support both cloud-based and local authentication.

**Manage Page Users Options:**

Option 1: Cloud Authentication
- Microsoft or Google SSO available
- Requires outbound HTTPS to account.picomes.io
- Cookie-based session (7-30 days configurable)
- User sync performed on-demand

Option 2: Local Authentication via LDAP/Active Directory
- Integration with customer Active Directory
- LDAP bind for username/password verification
- No cloud dependency for authentication
- Customer manages user accounts
- Group-based access control mapping

Option 3: Pico-Managed Local Authentication
- Self-hosted authentication application
- Local user database on Pico Server
- Customer manages users via Pico interface
- No external dependencies
- Password policy enforcement

**Operator Authentication (Always Local):**
- 6-digit PIN codes stored locally
- Badge scanning via local badge readers
- No cloud dependency
- Immediate operation without connectivity`
        },
        {
          id: "gcchigh",
          title: "GCC High Authentication Setup",
          content: `**Microsoft Azure GCC High SSO Integration**

For government customers using GCC High tenants, Pico MES can integrate with Azure Entra ID (formerly Azure AD) for seamless Single Sign-On authentication.

**Overview:**
Pico MES integrates with your GCC High tenant for Azure Entra ID SSO by setting up an application registration in your tenant that points to Pico's account services. This provides limited information to Pico - only enough to identify operators and managers for proper system permissions.

**Required Information:**
- Application (client) ID
- Client Secret Value
- Client Secret ID

**Setup Process:**

Step 1: Create App Registration
1. Navigate to Azure Portal and search for "App registrations"
2. Click "New registration"
3. Configure the application:
   - Name: PicoMES
   - Supported account types: Select "Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts"
   - Redirect URI: Select "Web" and enter: https://account.picomes.io/auth/azuregcchigh/callback
4. Click "Register"

Step 2: Copy Application (Client) ID
- After registration, copy the Application (client) ID GUID
- Save this securely - you'll provide it to Pico

Step 3: Create Client Secret
1. Click "Add a certificate or secret" link
2. Click "New client secret"
3. Configure the secret:
   - Description: PicoAppSecret (or your preferred name)
   - Expires: Recommended 12 months (1 year)
4. Click "Add"
5. Copy BOTH the Value and Secret ID immediately
   - Note: The Value will only be shown once
   - Save both securely - you'll provide them to Pico

Step 4: Configure API Permissions
1. Click "API permissions" in the left navigation
2. Click "Add a permission"
3. Select "Microsoft Graph"
4. Select "Delegated permissions"
5. Add the following permissions:
   - email (View users' email address)
   - openid (Sign users in)
   - profile (View users' basic profile)
6. Click "Add permissions"

**Data Access:**
Pico only accesses:
- User email address (for identification)
- Basic profile information (name, etc.)
- OpenID authentication tokens

**Security Notes:**
- Secrets should be rotated annually
- Use delegated permissions (not application permissions)
- Admin consent may be required depending on tenant settings
- Monitor the application usage through Azure AD audit logs

**Providing Credentials to Pico:**
After completing setup, securely provide Pico with:
1. Application (client) ID
2. Client Secret Value
3. Client Secret ID

Pico will configure the account services to enable GCC High authentication for your deployment.

**Network Requirements for GCC High:**
Ensure the following domains are whitelisted:
- login.microsoftonline.com (HTTPS/443)
- graph.microsoft.com (HTTPS/443)
- account.picomes.io (HTTPS/443)

**Annual Maintenance:**
- Client secrets expire after one year (recommended setting)
- Generate new secret before expiration
- Provide new credentials to Pico
- Old secret can be deleted after Pico confirms new credentials working`
        },
        {
          id: "updates",
          title: "Manual Update Process",
          content: `**Software Update Methodology**

With VPN disabled by default, all Pico MES updates must be performed manually.

**Update Delivery Methods:**

Method 1: On-Site Installation by Pico Personnel
- Pico engineer travels to customer site
- Update files on encrypted USB drive
- Direct connection to Pico Server
- Installation performed on-site
- Typical duration: 4-8 hours

Method 2: Temporary VPN Access
- Customer receives advance notice
- Customer schedules maintenance window
- Customer enables VPN access temporarily
- Pico performs update remotely
- Customer validates and disables VPN
- Typical duration: 2-4 hours

Method 3: Customer-Managed Installation
- Pico provides update package via secure file transfer
- Customer IT personnel perform installation
- Pico provides support via screen sharing or phone
- Customer validates successful installation
- Typical duration: 4-8 hours (first time)

**Recommended Update Schedule:**
- Major releases: Semi-annually
- Security patches: Quarterly or as-needed
- Feature updates: Annual or as-requested
- Critical hotfixes: Emergency procedures`
        }
      ]
    },
    strict: {
      title: "Strict Air-Gapped Deployment",
      icon: <Lock className="w-6 h-6" />,
      color: "red",
      sections: [
        {
          id: "overview",
          title: "Level 3 Strict Air-Gap Overview",
          content: `**Maximum Security Air-Gap Configuration**

Level 3 "Strict Air-Gap" represents the most secure deployment configuration for organizations with the highest security requirements.

**Defining Characteristics:**
- Zero outbound internet connectivity from Pico system
- No VPN or remote access by Pico personnel
- Complete customer-managed operations
- Local authentication only - no cloud services
- Self-managed backups with no cloud involvement
- On-site support only

**Security Posture:**
- Air-gapped from internet at network level
- Physically isolated from external networks
- Complete data sovereignty
- Maximum audit and control
- Suitable for ITAR Level 3, classified environments

**Compliance:**
- SOC 2 Type 2 processes adapted for air-gap
- ITAR-compliant with on-site-only support
- Full customer control over all data and access
- Suitable for classified and highest-security environments

**Prerequisites:**
- Advanced Linux system administration expertise
- Dedicated IT staff with 24/7 availability
- Comprehensive backup and disaster recovery capabilities
- Procedures for air-gapped software updates
- Physical security controls for on-site support
- Detailed documentation and change management`
        },
        {
          id: "isolation",
          title: "Network Isolation & Security Architecture",
          content: `**Complete Network Isolation**

**Physical Network Separation:**

Pico Network Segment:
- Dedicated VLAN or physically separate network
- No routing to internet-connected networks
- Air-gapped at firewall level
- Only internal connectivity permitted

**Allowed Connections:**
- Pico Hubs ↔ Pico Server (bidirectional)
- User workstations → Pico Server (HTTPS only)
- Pico Server → Customer LDAP/AD (authentication)
- Pico Server → Local NTP server (time sync)
- Pico Server → Local file server (backups)

**Blocked Connections:**
- Any outbound to internet
- Any inbound from internet
- Any connection to external networks
- Any VPN connections
- Any cloud services

**Network Security Controls:**

Firewall Configuration (whitelist-only):
- Inbound: User workstations → Pico Server:443
- Inbound: Pico Hubs → Pico Server (required ports)
- Outbound: Pico Server → LDAP server:389/636
- Outbound: Pico Server → NTP server:123
- Outbound: Pico Server → File server:445/2049
- Default: DENY ALL

**Physical Security:**
- Controlled access to Pico Server
- Video surveillance of server location
- Access logs maintained
- Tamper-evident Hub enclosures
- USB port locks (optional)
- Portable media controls`
        },
        {
          id: "authentication",
          title: "Local Authentication & Access Control",
          content: `**Zero Cloud Authentication**

All authentication must be performed locally without external dependencies.

**LDAP/Active Directory Integration (Preferred):**

Configuration:
- Pico integrates with on-premise Active Directory
- LDAP bind authentication (port 389 or 636 LDAPS)
- Group-based access control mapping
- No external dependencies

Setup Requirements:
1. Customer provides LDAP server details
2. Customer creates AD security groups
3. Pico configures LDAP integration
4. Testing and validation

**Pico-Managed Local Authentication (Alternative):**

Features:
- Local user database on Pico Server
- SHA-256 hashed passwords with salt
- Configurable password policies
- No external dependencies
- Admin-managed user accounts

**Operator Authentication:**

PIN-Based Login:
- 6-digit PIN codes
- Stored locally in hashed format
- Assigned by administrator

Badge-Based Login:
- USB badge reader connected to Pico Hub
- Badge number associated with operator
- No external badge system required
- Immediate authentication response

**Multi-Factor Authentication Options:**
- Time-Based One-Time Password (TOTP)
- Hardware Token (FIDO2/U2F)
- Badge + PIN Combination`
        },
        {
          id: "updates",
          title: "Customer-Managed Installation & Updates",
          content: `**Self-Installation Process**

Level 3 deployments require complete customer-managed installation.

**Pre-Installation Package:**

Pico provides:
1. Installation Media (Encrypted USB Drive)
2. Documentation Package
3. Support Resources

**Customer Installation Process:**

Phase 1: Infrastructure Preparation (1-2 days)
- Provision server/VM per specifications
- Install Ubuntu Server
- Configure network settings
- Configure firewall rules
- Set up backup infrastructure

Phase 2: Pico Software Installation (2-4 hours)
- Verify USB media integrity
- Run installation script
- Provide configuration inputs
- Monitor installation progress

Phase 3: Configuration (4-8 hours)
- Complete initial setup wizard
- Configure authentication
- Set up monitoring and alerting
- Configure backup schedule

Phase 4: Hub Registration (1-2 hours per Hub)
- Connect Hubs and register
- Test connectivity

Phase 5: Validation (1-2 days)
- Run validation scripts
- Test all functions

Total Timeline: 4-7 business days

**Software Update Process:**

Update Delivery:
- Encrypted USB drive shipped to facility
- Secure file transfer (if available)
- On-site delivery by Pico personnel

Customer Update Process:
1. Review release notes
2. Backup current system
3. Test in test environment (if available)
4. Schedule downtime
5. Run update installation
6. Validate functionality
7. Rollback if needed

**Update Frequency:**
- Critical Security Patches: As needed
- Major Updates: Annually
- Minor Updates: As requested`
        },
        {
          id: "backup",
          title: "Self-Managed Backup & Disaster Recovery",
          content: `**Comprehensive Backup Strategy**

Customers have complete responsibility for data protection.

**Multi-Tier Backup Approach:**

Tier 1: VM Snapshots (Primary)
- Daily at 2:00 AM
- Retain 7 daily, 4 weekly
- Fastest recovery method

Tier 2: Database Backups (Secondary)
- Nightly at 3:00 AM
- Retain 30 daily, 12 weekly, 12 monthly
- Compressed and encrypted

Tier 3: Offline/Off-Site (Tertiary)
- Weekly to encrypted USB
- Monthly to tape/removable storage
- Annual archive for compliance
- Stored in secure off-site location

**Disaster Recovery Procedures:**

Scenario 1: Application Failure
- Restore from backup
- RTO: 2-4 hours, RPO: 24 hours

Scenario 2: VM Corruption
- Restore from VM snapshot
- RTO: 4-8 hours

Scenario 3: Complete Site Failure
- New VM provisioning required
- Fresh installation and data restore
- RTO: 1-2 business days

**Testing Requirements:**
- Quarterly disaster recovery tests
- Annual full recovery exercise
- Document all procedures
- Train backup administrators`
        },
        {
          id: "support",
          title: "On-Site Support Only",
          content: `**Support Model**

Level 3 deployments require on-site support only.

**Primary Support Method: On-Site Visits**

When Required:
- Complex troubleshooting
- System updates or upgrades
- Integration of new tools
- Training and knowledge transfer

Visit Planning:
1. Customer reports issue
2. Pico determines on-site visit needed
3. Schedule visit (typically 3-5 business days)
4. Pico engineer travels to site
5. Issue resolution on-site
6. Documentation and validation

**Support Response Times:**

Critical (Production Down):
- Initial Response: 2 hours
- On-site visit: Within 24-48 hours

High (Major Function Impaired):
- Initial Response: 4 business hours
- On-site visit: Within 5 business days

Medium (Minor Issue):
- Initial Response: 1 business day
- On-site visit: 2-3 weeks

Low (Enhancement):
- Initial Response: 2 business days
- Handled via future release or planned visit

**Customer Responsibilities:**
- Provide facility access
- Make technical staff available
- Provide workspace and network access
- Document changes and training`
        },
        {
          id: "requirements",
          title: "Level 3 Implementation Requirements",
          content: `**Prerequisites**

**Customer Technical Capabilities:**

Required Skills:
- Linux system administration
- Network configuration and firewall management
- Backup and recovery procedures
- Database administration
- Security and access control

Required Resources:
- Dedicated IT staff for Pico system
- 24/7 on-call support for production
- Backup administrator
- Security administrator

**Implementation Process:**

Phase 1: Planning (2-4 weeks)
- Security requirements documentation
- Backup strategy selection
- Authentication model selection
- Network architecture design

Phase 2: Installation (1-2 weeks)
- Standard Pico installation
- Backup configuration
- Authentication integration
- Firewall implementation

Phase 3: Configuration (1-2 weeks)
- Alert configuration
- Backup testing
- Hub registration

Phase 4: Training (1 week)
- IT staff training
- Support procedures
- Backup/recovery procedures

Phase 5: Validation (1-2 weeks)
- Full system testing
- Disaster recovery test
- Security audit

Total Implementation: 6-11 weeks

**Ongoing Operations:**

Daily: Monitor health, review alerts, verify backups
Weekly: Review logs, check performance
Monthly: Backup restoration test, joint review
Quarterly: Disaster recovery test, security audit
Annually: Comprehensive audit, capacity planning`
        }
      ]
    }
  };

  const selectedDocData = documents[selectedDoc];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pico MES Infrastructure Documentation</h1>
          <p className="text-gray-600">Comprehensive deployment guides for various security environments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(documents).map(([key, doc]) => (
            <button
              key={key}
              onClick={() => setSelectedDoc(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedDoc === key
                  ? `border-${doc.color}-500 bg-${doc.color}-50`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`flex items-center justify-center mb-2 text-${doc.color}-600`}>
                {doc.icon}
              </div>
              <div className="text-sm font-semibold text-center text-gray-900">{doc.title}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <div className="flex items-center justify-center mb-4 text-white">
              {selectedDocData.icon}
            </div>
            <h2 className="text-2xl font-bold text-center text-white">{selectedDocData.title}</h2>
          </div>

          <div className="p-6">
            {selectedDocData.sections.map((section) => (
              <div key={section.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  {expandedSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {expandedSections[section.id] && (
                  <div className="px-6 py-4 bg-white">
                    {section.diagram && (
                      <div className="mb-6 bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                        <h4 className="text-center font-bold text-gray-900 mb-4">System Architecture Diagram</h4>
                        <svg viewBox="0 0 800 500" className="w-full h-auto">
                          {/* Cloud */}
                          <g>
                            <ellipse cx="650" cy="80" rx="80" ry="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
                            <text x="650" y="75" textAnchor="middle" className="text-sm font-semibold" fill="#1e40af">Cloud</text>
                            <text x="650" y="90" textAnchor="middle" className="text-xs" fill="#1e40af">Account mgmt &</text>
                            <text x="650" y="102" textAnchor="middle" className="text-xs" fill="#1e40af">data storage</text>
                          </g>
                          
                          {/* Pico Server */}
                          <g>
                            <rect x="550" y="220" width="120" height="80" rx="5" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                            <rect x="560" y="235" width="20" height="15" fill="#93c5fd"/>
                            <rect x="560" y="255" width="20" height="15" fill="#93c5fd"/>
                            <rect x="560" y="275" width="20" height="15" fill="#93c5fd"/>
                            <text x="610" y="250" textAnchor="middle" className="text-sm font-semibold" fill="white">Pico Server</text>
                            <text x="610" y="268" textAnchor="middle" className="text-xs" fill="white">Intel NUC</text>
                            <text x="610" y="283" textAnchor="middle" className="text-xs" fill="white">1 per factory</text>
                          </g>
                          
                          {/* Connection from Cloud to Server */}
                          <line x1="650" y1="130" x2="650" y2="220" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5"/>
                          <polygon points="650,220 645,210 655,210" fill="#6b7280"/>
                          
                          {/* APIs Box */}
                          <g>
                            <rect x="320" y="40" width="140" height="60" rx="5" fill="white" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5"/>
                            <text x="390" y="60" textAnchor="middle" className="text-xs font-semibold" fill="#374151">APIs</text>
                            <text x="390" y="75" textAnchor="middle" className="text-xs" fill="#374151">Hub & server</text>
                            <text x="390" y="88" textAnchor="middle" className="text-xs" fill="#374151">connections</text>
                          </g>
                          
                          {/* Factory Floor Area */}
                          <rect x="30" y="150" width="480" height="320" rx="5" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" strokeDasharray="10,5"/>
                          
                          {/* Operators Section */}
                          <g>
                            {/* Operator 1 */}
                            <circle cx="80" cy="260" r="15" fill="#d1d5db"/>
                            <rect x="75" y="275" width="10" height="20" fill="#d1d5db"/>
                            <line x1="80" y1="285" x2="70" y2="305" stroke="#d1d5db" strokeWidth="3"/>
                            <line x1="80" y1="285" x2="90" y2="305" stroke="#d1d5db" strokeWidth="3"/>
                            
                            {/* Tool icons */}
                            <rect x="120" y="240" width="30" height="35" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1"/>
                            <rect x="125" y="245" width="20" height="5" fill="#9ca3af"/>
                            
                            <rect x="160" y="240" width="30" height="35" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1"/>
                            
                            <rect x="200" y="240" width="30" height="35" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1"/>
                            
                            {/* Hub */}
                            <rect x="110" y="310" width="50" height="30" rx="3" fill="#1f2937" stroke="#000" strokeWidth="1"/>
                            <circle cx="120" cy="325" r="3" fill="#10b981"/>
                          </g>
                          
                          {/* Production Line Section */}
                          <g>
                            {/* Operator 2 */}
                            <circle cx="320" cy="260" r="15" fill="#d1d5db"/>
                            <rect x="315" y="275" width="10" height="20" fill="#d1d5db"/>
                            <line x1="320" y1="285" x2="310" y2="305" stroke="#d1d5db" strokeWidth="3"/>
                            <line x1="320" y1="285" x2="330" y2="305" stroke="#d1d5db" strokeWidth="3"/>
                            
                            {/* Hub 1 */}
                            <rect x="255" y="190" width="50" height="30" rx="3" fill="#1f2937" stroke="#000" strokeWidth="1"/>
                            <circle cx="265" cy="205" r="3" fill="#10b981"/>
                            
                            {/* Machine cluster 1 */}
                            <g>
                              <rect x="250" y="235" width="30" height="40" fill="#4b5563" stroke="#1f2937" strokeWidth="2"/>
                              <rect x="255" y="240" width="20" height="8" fill="#9ca3af"/>
                              <rect x="255" y="252" width="20" height="8" fill="#9ca3af"/>
                              <rect x="255" y="264" width="20" height="8" fill="#9ca3af"/>
                            </g>
                            
                            {/* Hub 2 */}
                            <rect x="315" y="190" width="50" height="30" rx="3" fill="#1f2937" stroke="#000" strokeWidth="1"/>
                            <circle cx="325" cy="205" r="3" fill="#10b981"/>
                            
                            {/* Machine cluster 2 */}
                            <g>
                              <rect x="310" y="235" width="30" height="40" fill="#4b5563" stroke="#1f2937" strokeWidth="2"/>
                              <rect x="315" y="240" width="20" height="8" fill="#9ca3af"/>
                              <rect x="315" y="252" width="20" height="8" fill="#9ca3af"/>
                              <rect x="315" y="264" width="20" height="8" fill="#9ca3af"/>
                            </g>
                            
                            {/* Hub 3 */}
                            <rect x="375" y="190" width="50" height="30" rx="3" fill="#1f2937" stroke="#000" strokeWidth="1"/>
                            <circle cx="385" cy="205" r="3" fill="#10b981"/>
                            
                            {/* Machine cluster 3 */}
                            <g>
                              <rect x="370" y="235" width="30" height="40" fill="#4b5563" stroke="#1f2937" strokeWidth="2"/>
                              <rect x="375" y="240" width="20" height="8" fill="#9ca3af"/>
                              <rect x="375" y="252" width="20" height="8" fill="#9ca3af"/>
                              <rect x="375" y="264" width="20" height="8" fill="#9ca3af"/>
                            </g>
                            
                            {/* Hub 4 */}
                            <rect x="435" y="190" width="50" height="30" rx="3" fill="#1f2937" stroke="#000" strokeWidth="1"/>
                            <circle cx="445" cy="205" r="3" fill="#10b981"/>
                            
                            {/* Machine cluster 4 */}
                            <g>
                              <rect x="430" y="235" width="30" height="40" fill="#4b5563" stroke="#1f2937" strokeWidth="2"/>
                              <rect x="435" y="240" width="20" height="8" fill="#9ca3af"/>
                              <rect x="435" y="252" width="20" height="8" fill="#9ca3af"/>
                              <rect x="435" y="264" width="20" height="8" fill="#9ca3af"/>
                            </g>
                          </g>
                          
                          {/* Network connections from Hubs to Server */}
                          <path d="M 160 325 Q 400 300 550 260" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                          <path d="M 280 220 Q 400 240 550 250" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                          <path d="M 340 220 Q 450 235 550 245" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                          <path d="M 400 220 Q 475 230 550 255" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                          <path d="M 460 220 Q 500 235 550 265" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                          
                          {/* Labels */}
                          <text x="260" y="445" className="text-xs font-semibold" fill="#374151">Factory Floor - Local Network</text>
                          
                          {/* Legend */}
                          <g transform="translate(30, 380)">
                            <text x="0" y="15" className="text-xs font-semibold" fill="#374151">Legend:</text>
                            <rect x="0" y="25" width="20" height="15" rx="2" fill="#1f2937"/>
                            <text x="25" y="37" className="text-xs" fill="#374151">Pico Hub</text>
                            
                            <rect x="120" y="25" width="20" height="15" rx="2" fill="#4b5563"/>
                            <text x="145" y="37" className="text-xs" fill="#374151">Machine/Tool</text>
                            
                            <circle cx="260" cy="32" r="7" fill="#d1d5db"/>
                            <text x="275" y="37" className="text-xs" fill="#374151">Operator</text>
                            
                            <line x1="360" y1="32" x2="390" y2="32" stroke="#3b82f6" strokeWidth="2"/>
                            <text x="395" y="37" className="text-xs" fill="#374151">Network Connection</text>
                          </g>
                          
                          {/* Component labels */}
                          <text x="135" y="365" className="text-xs font-semibold" fill="#1e40af">Pico Hubs</text>
                          <text x="120" y="378" className="text-xs" fill="#374151">Edge devices (as many</text>
                          <text x="120" y="390" className="text-xs" fill="#374151">as needed)</text>
                        </svg>
                      </div>
                    )}
                    <div className="prose max-w-none">
                      {section.content.split('\n').map((line, idx) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <h4 key={idx} className="font-bold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
                        } else if (line.startsWith('- ')) {
                          return <li key={idx} className="ml-4 text-gray-700">{line.substring(2)}</li>;
                        } else if (line.trim() === '') {
                          return <br key={idx} />;
                        } else {
                          return <p key={idx} className="text-gray-700 mb-2">{line}</p>;
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Compliance & Security Certifications</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>SOC 2 Type 2:</strong> Pico MES completed SOC 2 Type 2 compliance certification as of Q3 2022</p>
            <p><strong>ITAR Registration:</strong> Pico is ITAR-registered and provides US Citizen-only support for sensitive deployments</p>
            <p><strong>Security Audits:</strong> Third-party cybersecurity firms have evaluated Pico's VPN access controls and security procedures</p>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>For more information: <a href="https://picomes.com" className="text-blue-600 hover:underline">picomes.com</a> | <a href="mailto:contact@picomes.com" className="text-blue-600 hover:underline">contact@picomes.com</a></p>
          <p className="mt-2">Pico MES | 303 Twin Dolphin Drive, Suite 600, Redwood City, CA 94065</p>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureDocs;
