app.delete('/delete-users', async (req, res) => {
    try {
      const result = await prisma.users.deleteMany({});
      res.json({ message: `Deleted ${result.count} user records.` });
    } catch (error) {
      res.status(500).json({ error: "Error deleting users." });
    }
  });