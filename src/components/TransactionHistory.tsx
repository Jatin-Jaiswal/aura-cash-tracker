import { Transaction } from '@/hooks/useUserManager';
import { formatDistanceToNow } from 'date-fns';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No transactions yet</p>
        <p className="text-sm mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-60 overflow-y-auto">
      <h4 className="text-sm font-medium text-muted-foreground border-b border-border/20 pb-2">
        Transaction History
      </h4>
      
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-background-secondary/50 border border-border/10 transition-smooth hover:bg-background-secondary/70"
        >
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            transaction.type === 'add' 
              ? "bg-neon-green/20 text-neon-green" 
              : "bg-destructive/20 text-destructive"
          )}>
            {transaction.type === 'add' ? (
              <Plus className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className={cn(
                "font-semibold",
                transaction.type === 'add' ? "text-neon-green" : "text-destructive"
              )}>
                {transaction.type === 'add' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {transaction.reason}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};