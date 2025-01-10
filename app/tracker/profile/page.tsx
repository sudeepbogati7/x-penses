import UserProfile from '@/components/userProfile';

export default function ProfilePage() {
  return (
    <main className=" flex items-center justify-center p-4">
      <UserProfile 
        name="John Doe"
        email="john@example.com"
        joinedDate="May 15, 2023"
        totalExpenses={12345.67}
        monthlyBudget={2000}
        currentMonthExpenses={1234.56}
        preferredCurrency="$"
        mostUsedCategory="Groceries"
        avatarUrl="https://github.com/shadcn.png"
      />
    </main>
  )
}

