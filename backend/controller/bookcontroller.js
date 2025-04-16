import Book from "../model/bookmodel.js";
export const getBook=async(req,res) =>{
    try{
  const book = await Book.find();
  
   res.status(200).json(book);
    }catch(error){
       console.log("Error:",error);
       res.status(500).json(error);
    }
};

export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json(error);
  }
};