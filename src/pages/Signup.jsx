import { Link } from "react-router-dom";

function Signup() {
  return (

    <>
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style={{borderRadius: "1rem"}}>
             <Link to="/" > <button type="button" class="btn-close" aria-label="Close" style={{position: "absolute", top: "10px", right: "10px"}}></button></Link>
                <div class="card-body text-center" style={{padding: "20px 40px"}}>
      
                  <h3 class="mb-5">Sign Up</h3>
      
                  <form class="row g-3">
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="text" id="name" class="form-control form-control-lg" />
                        <label class="form-label" for="name">Name</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="text" id="phone" class="form-control form-control-lg" />
                        <label class="form-label" for="phone">Phone Number</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="email" id="email" class="form-control form-control-lg" />
                        <label class="form-label" for="email">Email</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="password" id="password" class="form-control form-control-lg" />
                        <label class="form-label" for="password">Password</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="password" id="confirmPassword" class="form-control form-control-lg" />
                        <label class="form-label" for="confirmPassword">Confirm Password</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="text" id="address" class="form-control form-control-lg" />
                        <label class="form-label" for="address">Address</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="text" id="city" class="form-control form-control-lg" />
                        <label class="form-label" for="city">City</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline">
                        <input type="text" id="country" class="form-control form-control-lg" />
                        <label class="form-label" for="country">Country</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" style={{width: "100%"}} type="submit">Sign Up</button>
                    </div>
                  </form>
      
                  <hr class="my-4"/>
      
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block btn-primary me-2"  style={{backgroundColor: "#dd4b39",width: "20%"}}
                    type="submit"><i class="bi bi-google"></i></button>
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block btn-primary" style={{backgroundColor: "#3b5998", width: "20%"}}
                    type="submit"><i class="bi bi-facebook"></i></button>
                  
                  
                  <Link to="/login" class="btn btn-link mt-3">Have an account? Log in</Link>
      
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;