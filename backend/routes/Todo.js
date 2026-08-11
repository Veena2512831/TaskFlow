import authMiddleware from "../middleware/auth.js";

router.get("/todos", authMiddleware, async (req, res) => {
  // req.user.userId is now available here
});