import UserProfile from '@/components/userProfile';

export default function ProfilePage() {
  return (
    <main className=" flex items-center justify-center p-4">
      <UserProfile 
        name="Sudeep Bogati"
        email="hello@sudipbogati.com.np"
        joinedDate="Jan 16, 2000"
        totalExpenses={5.0}
        monthlyBudget={10.0}
        currentMonthExpenses={2.0}
        preferredCurrency="Rs."
        mostUsedCategory="Groceries"
        avatarUrl="https://github.com/shadcn.png"
      />
    </main>
  )
}

