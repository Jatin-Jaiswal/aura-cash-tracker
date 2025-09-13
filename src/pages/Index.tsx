import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Wallet } from 'lucide-react';
import { useUserManager } from '@/hooks/useUserManager';
import { UserCard } from '@/components/UserCard';
import { AddUserModal } from '@/components/AddUserModal';
import { toast } from '@/hooks/use-toast';



const Index = () => {
  const { users, addUser, deleteUser, addTransaction } = useUserManager();
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleAddUser = (name: string) => {
    // Check for duplicate names
    if (users.some(user => user.name.toLowerCase() === name.toLowerCase())) {
      toast({
        title: "User already exists",
        description: "A user with this name already exists.",
        variant: "destructive",
      });
      return;
    }
    
    addUser(name);
    toast({
      title: "User added",
      description: `${name} has been added successfully.`,
    });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    deleteUser(userId);
    toast({
      title: "User deleted",
      description: `${userName} has been removed.`,
    });
  };

  const handleTransaction = (userId: string, amount: number, reason: string, type: 'add' | 'deduct') => {
    addTransaction(userId, amount, reason, type);
    const action = type === 'add' ? 'added to' : 'deducted from';
    toast({
      title: "Transaction completed",
      description: `₹${amount} ${action} balance.`,
    });
  };

  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-background-secondary/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center">
                <Wallet className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Money Manager</h1>
                <p className="text-muted-foreground">Track expenses with friends and family</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className={`text-2xl font-bold ${
                totalBalance > 0 ? 'text-neon-green' : 
                totalBalance < 0 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                ₹{totalBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {users.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center">
              <UserPlus className="w-12 h-12 text-neon-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No users yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start by adding your first user to begin tracking money transactions
            </p>
            <Button
              onClick={() => setShowAddUserModal(true)}
              className="btn-neon-cyan border-0 text-background font-semibold px-8 py-3 text-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Your First User
            </Button>
          </div>
        ) : (
          // Users Grid
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Users
              </h2>
              <Button
                onClick={() => setShowAddUserModal(true)}
                className="btn-neon-cyan border-0 text-background font-semibold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onAddTransaction={(amount, reason, type) => 
                    handleTransaction(user.id, amount, reason, type)
                  }
                  onDeleteUser={() => handleDeleteUser(user.id, user.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onConfirm={handleAddUser}
      />
    </div>
  );
};

export default Index;
