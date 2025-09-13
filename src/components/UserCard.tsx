import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, Plus, Minus, Trash2 } from 'lucide-react';
import { User } from '@/hooks/useUserManager';
import { TransactionModal } from './TransactionModal';
import { TransactionHistory } from './TransactionHistory';
import { cn } from '@/lib/utils';

interface UserCardProps {
  user: User;
  onAddTransaction: (amount: number, reason: string, type: 'add' | 'deduct') => void;
  onDeleteUser: () => void;
}

export const UserCard = ({ user, onAddTransaction, onDeleteUser }: UserCardProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [modalOpen, setModalOpen] = useState<'add' | 'deduct' | null>(null);

  const getBalanceClass = (balance: number) => {
    if (balance > 0) return 'balance-positive';
    if (balance < 0) return 'balance-negative';
    return 'balance-zero';
  };

  const handleTransaction = (amount: number, reason: string) => {
    if (modalOpen) {
      onAddTransaction(amount, reason, modalOpen);
      setModalOpen(null);
    }
  };

  return (
    <>
      <Card className="glass-card p-6 transition-smooth hover:scale-[1.02] border-border/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-1">{user.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Balance:</span>
              <span className={cn("text-2xl font-bold transition-smooth", getBalanceClass(user.balance))}>
                ₹{user.balance.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="border-border/30 hover:border-neon-cyan/50 transition-smooth"
            >
              History
              <ChevronDown 
                className={cn("w-4 h-4 ml-1 transition-transform", showHistory && "rotate-180")} 
              />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onDeleteUser}
              className="border-destructive/30 hover:border-destructive hover:bg-destructive/10 text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setModalOpen('add')}
            className="flex-1 btn-neon-cyan border-0 text-background font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Money
          </Button>
          
          <Button
            onClick={() => setModalOpen('deduct')}
            variant="outline"
            className="flex-1 border-destructive/30 hover:border-destructive hover:bg-destructive/10 text-destructive"
          >
            <Minus className="w-4 h-4 mr-2" />
            Deduct Money
          </Button>
        </div>

        {showHistory && (
          <div className="mt-4 animate-slide-up">
            <TransactionHistory transactions={user.transactions} />
          </div>
        )}
      </Card>

      <TransactionModal
        isOpen={modalOpen !== null}
        onClose={() => setModalOpen(null)}
        onConfirm={handleTransaction}
        type={modalOpen || 'add'}
        userName={user.name}
      />
    </>
  );
};