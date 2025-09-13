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
import { Plus, Minus } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, reason: string) => void;
  type: 'add' | 'deduct';
  userName: string;
}

export const TransactionModal = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  userName,
}: TransactionModalProps) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    
    if (amountNum > 0 && reason.trim()) {
      onConfirm(amountNum, reason.trim());
      handleClose();
    }
  };

  const handleClose = () => {
    setAmount('');
    setReason('');
    onClose();
  };

  const isValid = parseFloat(amount) > 0 && reason.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-border/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            {type === 'add' ? (
              <Plus className="w-5 h-5 text-neon-green" />
            ) : (
              <Minus className="w-5 h-5 text-destructive" />
            )}
            {type === 'add' ? 'Add Money' : 'Deduct Money'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {type === 'add' ? 'Add money to' : 'Deduct money from'} {userName}'s balance
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">
              Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-input border-border/30 focus:border-neon-cyan focus:ring-neon-cyan/20"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-foreground">
              Reason
            </Label>
            <Input
              id="reason"
              placeholder="Enter reason for transaction"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-input border-border/30 focus:border-neon-cyan focus:ring-neon-cyan/20"
              required
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
              className={
                type === 'add'
                  ? 'btn-neon-cyan border-0 text-background font-semibold'
                  : 'bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold'
              }
            >
              {type === 'add' ? 'Add Money' : 'Deduct Money'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};