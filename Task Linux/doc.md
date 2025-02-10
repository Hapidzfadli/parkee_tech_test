# Linux Script Documentation

## 1. update_system.sh

Purpose: Automatically updates system packages based on the detected package manager.

Common Commands:

- `command -v`: Checks if command exists in PATH
- `apt update/upgrade`: Updates Debian-based systems
- `yum update`: Updates RHEL/CentOS systems
- `dnf upgrade`: Updates Fedora systems
- `tee -a`: Appends output to log file and shows in terminal
- `id -u`: Gets current user ID (0 for root)

Execution:
chmod +x update_system.sh
sudo ./update_system.sh

## 2. scp_file.sh

Purpose: Transfers files securely between systems using SCP.

Common Commands:

- `scp`: Secure copy protocol command
- `$#`: Number of command-line arguments
- `$1, $2, $3`: Command-line argument variables

chmod +x scp_file.sh
./scp_file.sh file.txt username 192.168.1.100

## 3. find_files.sh

Purpose: Searches for files with specific extensions in directories.

Common Commands:

- `find`: Searches for files in directory hierarchy
- `-type f`: Specifies regular files only
- `-name`: Pattern matching for filenames

chmod +x find_files.sh
./find_files.sh /path/to/search txt

## 4. generate_ssh_key.sh

Purpose: Generates SSH key pairs for secure authentication.

Common Commands:

- `ssh-keygen`: Generates SSH key pairs
- `-t rsa`: Specifies RSA key type
- `-b 2048`: Sets key bit length
- `-f`: Specifies output file
- `-N ""`: Empty passphrase
- `mkdir -p`: Creates directories if they don't exist

chmod +x generate_ssh_key.sh
./generate_ssh_key.sh /path/to/output

## 5. manage_service.sh

Purpose: Controls system services using systemctl.

Common Commands:

- `systemctl`: Controls systemd system and service manager
- `start`: Starts a service
- `stop`: Stops a service
- `status`: Shows service status
- `case`: Shell command for pattern matching

chmod +x manage_service.sh
sudo ./manage_service.sh nginx start # Start service
sudo ./manage_service.sh nginx stop # Stop service
sudo ./manage_service.sh nginx status # Check status

## General Usage Notes:

1. All scripts require execute permissions (`chmod +x script.sh`)
2. Some scripts require root privileges (`sudo ./script.sh`)
3. Each script includes parameter validation
4. All scripts use proper error handling
5. Most scripts follow the pattern: check args → process → output result

## Common Flags:

- `-y`: Auto-confirm prompts
- `-a`: Append to file
- `-p`: Create parent directories
- `-f`: Specify file
- `-t`: Specify type

```

```
