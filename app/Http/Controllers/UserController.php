<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Arr;

class UserController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request) : Response
    {
        $search = $request->search;
        $status = $request->status;
        $users = User::with('roles')->when($search,function($q,$search){
            $q->where('name','like','%'.$search.'%');
        })
        ->when($status  , function($q,$status){
            if ($status == 'active') {
                $q->where('status', 1);
            }elseif ($status == 'inactive') {
                $q->where('status', 0);
            }
        })
        ->paginate(10)->through(function($q){
            $q['role'] = $q->getRoleNames()[0] ?? null;
            unset($q->roles);
            return $q;
        });
        return Inertia::render('User/Index', [
            "title" => "Users",
            'users' => $users,
        ]);
    }


    public function create(Request $request): Response
    {
        $roles = Role::select('name')->get();
        return Inertia::render('User/Form',[
            "title" => "Add User",
            "roles" => $roles
        ]);
    }

    public function edit(Request $request,User $user): Response
    {
        $roles = Role::select('name')->get();
        $user->role = $user->getRoleNames()[0] ?? null;
        return Inertia::render('User/Form',[
            "title" => "Edit User",
            'user' => $user,
            "roles" => $roles
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required',
            'status' => 'required|boolean',
            'role' => 'required|exists:roles,name'
        ]);
        $validate['password'] = bcrypt($validate["password"]);
        $validate['status'] = 1;

        $user = User::create(Arr::except($validate, ['role']));
        $user->syncRoles($validate['role']);
        return to_route('users.index')->withSuccess("User created successfuly");;
    }
    public function update(Request $request,User $user)
    {
        $validate = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,'.$user->id,
            'password' => 'nullable',
            'status' => 'required|boolean',
            'role' => 'required|exists:roles,name'

        ]);
        $validate['password'] = $validate['password'] ? bcrypt($validate['password']) : $user->password;
        $user->update(Arr::except($validate, ['role']));
        $user->syncRoles($validate['role']);
        return to_route('users.index')->withSuccess("User updated successfuly");

    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->withSuccess("User deleted successfuly");

    }
    public function bulkDestroy(Request $request)
    {
        $validate = $request->validate([
            'ids' => 'required|array',
        ]);
        User::whereIn('id',$validate['ids'])->delete();
        return redirect()->back()->withSuccess("User deleted successfuly");
    }
}
