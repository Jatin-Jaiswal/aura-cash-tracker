import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  currentUserCount: number;
  maxUsers: number;
}

export const AddUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  currentUserCount,
  maxUsers,
}: AddUserModalProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && currentUserCount < maxUsers) {
      onConfirm(name.trim());
      handleClose();
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  const isValid = name.trim().length > 0;
  const canAddUser = currentUserCount < maxUsers;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-border/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <UserPlus className="w-5 h-5 text-neon-cyan" />
            Add New User
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {canAddUser 
              ? `Add a new user to your money manager (${currentUserCount}/${maxUsers})`
              : `Maximum users reached (${maxUsers}/${maxUsers})`
            }
          </DialogDescription>
        </DialogHeader>

        {canAddUser ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-foreground">
                User Name
              </Label>
              <Input
                id="userName"
                placeholder="Enter user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-border/30 focus:border-neon-cyan focus:ring-neon-cyan/20"
                required
                autoFocus
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-border/30 hover:border-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className="btn-neon-cyan border-0 text-background font-semibold"
              >
                Add User
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-border/30 hover:border-border"
            >
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};